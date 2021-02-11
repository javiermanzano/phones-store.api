const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./components/logger')({});
const configureExpressLogger = require('./components/network-logger');
const errorHandler = require('./components/middlewares/error-handler');

const phonesRoutes = require('./domain/phones/routes');

const createApp = async () => {
  const app = express();
  configureExpressLogger({ app, logger });
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use('/phones', phonesRoutes);

  app.use((req, res, next) => {
    next(createError(404));
  });
  app.use(errorHandler);
  return app;
};

module.exports = createApp;
