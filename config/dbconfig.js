const url = require('url');

const env = process.env.NODE_ENV;

const developmentDatabaseUrl = 'postgres://localhost:5432/crowd_health_development';
const testDatabaseUrl = 'postgres://localhost:5432/crowd_health_test';

let developmentConfig;
let testConfig;
let productionOrStagingConfig;

const configForDatabaseUrl = (databaseUrl) => {
  const params = url.parse(databaseUrl);
  const auth = params.auth && params.auth.split(':');

  return {
    user: auth && auth[0],
    password: auth && auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: env === 'production' || env === 'staging',
    poolSize: 20,
  };
};


if (env === 'production' || env === 'staging') {
  productionOrStagingConfig = configForDatabaseUrl(process.env.DATABASE_URL);
} else {
  developmentConfig = configForDatabaseUrl(developmentDatabaseUrl);
  testConfig = configForDatabaseUrl(testDatabaseUrl);
}

module.exports = {
  development: developmentConfig,
  test: testConfig,
  staging: productionOrStagingConfig || {},
  production: productionOrStagingConfig || {},
};
