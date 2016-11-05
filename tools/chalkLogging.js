/* eslint-disable no-console */
const chalk = require('chalk');

const logError = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`ERROR: ${chalk.red(message)}`);
  }
};

const logProcessing = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`PROCESSING: ${chalk.blue(message)}`);
  }
};

const logSuccess = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`SUCCESS: ${chalk.green(message)}`);
  }
};

const logWarning = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`WARNING: ${chalk.yellow(message)}`);
  }
};

module.exports = {
  logError,
  logProcessing,
  logSuccess,
  logWarning,
};
