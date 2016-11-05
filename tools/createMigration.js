const fs = require('fs');
const path = require('path');

const { logError } = require('./chalkLogging');

const padDate = (segment) => {
  const newSegment = segment.toString();
  return newSegment[1] ? newSegment : `0${newSegment}`;
};

const yyyymmddhhmmss = () => {
  const d = new Date();
  return d.getFullYear().toString() +
    padDate(d.getMonth() + 1) +
    padDate(d.getDate()) +
    padDate(d.getHours()) +
    padDate(d.getMinutes()) +
    padDate(d.getSeconds());
};

const migrationName = process.argv[2];

if (!migrationName) {
  const error = new Error('Missing migration name. usage: npm run migrate:make migrationName');
  logError(error);
  throw error;
}

const dateAndMigrationName = `${yyyymmddhhmmss()}_${migrationName}`;

const sqlUpMigrationTemplate = '/* Write your SQL up migration here */\n';
const sqlDownMigrationTemplate = '/* Write your SQL down migration here */\n';
const jsMigrationTemplatePath = path.join(__dirname, 'jsMigrationTemplate.js');

fs.readFile(jsMigrationTemplatePath, { encoding: 'utf-8' }, (error, data) => {
  if (error) {
    logError(error);
    throw error;
  }

  const jsMigrationTemplate = data.replace(/dateAndMigrationName/g, dateAndMigrationName);
  const migrationPath = './server/migrations';

  fs.writeFile(`${migrationPath}/sql/${dateAndMigrationName}_up.sql`, sqlUpMigrationTemplate);
  fs.writeFile(`${migrationPath}/sql/${dateAndMigrationName}_down.sql`, sqlDownMigrationTemplate);
  fs.writeFile(`${migrationPath}/${dateAndMigrationName}.js`, jsMigrationTemplate);
});
