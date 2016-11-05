const { development, test, staging, production } = require('./dbconfig');

module.exports = {
  development: {
    client: 'postgresql',
    connection: development,
    migrations: {
      directory: '../server/migrations',
      tableName: 'knex_migrations',
    },
  },

  test: {
    client: 'postgresql',
    connection: test,
    migrations: {
      directory: '../server/migrations',
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: staging,
    migrations: {
      directory: '../server/migrations',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: production,
    migrations: {
      directory: '../server/migrations',
      tableName: 'knex_migrations',
    },
  },
};
