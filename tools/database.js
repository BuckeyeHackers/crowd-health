const { camelizeKeys } = require('humps');
const path = require('path');
const pgPromise = require('pg-promise');

const dbconfig = require('../config/dbconfig');
const errors = require('./databaseErrorMessages');

let database;
const pgp = pgPromise();
const QueryFile = pgp.QueryFile;
const qrm = pgp.queryResult;

const resetSQL = new QueryFile(path.join(__dirname, 'resetDB.sql'), { minify: true });

switch (process.env.NODE_ENV) {
  case 'development':
    database = pgp(dbconfig.development);
    break;
  case 'test':
    database = pgp(dbconfig.test);
    break;
  case 'staging':
    database = pgp(dbconfig.staging);
    break;
  case 'production':
    database = pgp(dbconfig.production);
    break;
  default:
    throw new Error(`Database config for ${process.env.NODE_ENV} is missing.`);
}

const defaultParseRow = row => row;
const functionOnRows = (data, rowFunction) => {
  if (Array.isArray(data)) {
    let newData = data;
    newData = newData.map(row => rowFunction(row));
    return newData;
  }

  if (data !== null && typeof data === 'object') {
    return rowFunction(data);
  }

  return data;
};

const query = (sql, values, queryResultMask = qrm.any, parseRow = defaultParseRow) =>
  database.query(sql, values, queryResultMask)
    .then(data => functionOnRows(data, camelizeKeys))
    .then(data => functionOnRows(data, parseRow))
    .catch(error => Promise.reject(errors[error.code][error.constraint]));

const resetDB = () => query(resetSQL);

module.exports = {
  qrm,
  query,
  resetDB,
};
