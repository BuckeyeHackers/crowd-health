const pgp = require('pg-promise');
const path = require('path');

const QueryFile = pgp.QueryFile;

const sql = (file) => {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
};

module.exports = {
  userSQL: {
    create: sql('sql/User/create.sql'),
    destroy: sql('sql/User/destroy.sql'),
    emailExists: sql('sql/User/emailExists.sql'),
    index: sql('sql/User/index.sql'),
    login: sql('sql/User/login.sql'),
    show: sql('sql/User/show.sql'),
    update: sql('sql/User/update.sql'),
    usernameExists: sql('sql/User/usernameExists.sql'),
  },
  tokenSQL: {
    create: sql('sql/Token/create.sql'),
    deleteOrUpdate: sql('sql/Token/deleteOrUpdate.sql'),
  },
};
