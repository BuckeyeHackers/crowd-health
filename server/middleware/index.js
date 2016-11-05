const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const apiSubApp = require('./apiSubApp');

const addProductionMiddleware = (app) => {
  app.use(express.static(path.resolve(__dirname, '../../dist')));

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
  });
};

const addDevelopmentMiddleware = (app) => {
  /* eslint-disable global-require */
  const httpProxyMiddleware = require('http-proxy-middleware');
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');

  const webpackConfig = require('../../config/webpack.config.development');
  /* eslint-enable global-require */

  const compiler = webpack(webpackConfig);
  const webpackDevServer = new WebpackDevServer(compiler, {
    contentBase: [
      path.resolve(__dirname, '../../client'),
    ],
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    noInfo: false,
    quiet: false,
    inline: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  });

  webpackDevServer.listen(3001);

  app.use('*', httpProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  }));
};

const addMiddleware = (app) => {
  const isProduction = process.env.NODE_ENV === 'production';
  // eslint-disable-next-line no-unused-vars
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isTest = process.env.NODE_ENV === 'test';

  // logging
  if (!isTest) {
    app.use(morgan('dev'));
  }

  // parse the requests
  app.use(bodyParser.json());

  // mount the api
  app.use('/api', apiSubApp);

  // environment-specific middleware will be added in their respective functions
  if (isProduction || isTest) {
    addProductionMiddleware(app);
  } else {
    addDevelopmentMiddleware(app);
  }

  return app;
};

module.exports = addMiddleware;
