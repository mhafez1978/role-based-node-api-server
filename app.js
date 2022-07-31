const StartMyApp = () => {
  const config = require('./config');
  const express = require('express');
  const { Router } = require('express');

  const createHttpError = require('http-errors');
  const morgan = require('morgan');
  const mongoose = require('mongoose');

  const staticRouter = Router();
  const dynamicRouter = Router();

  const staticRoutes = require('./router/staticRoutes.js');
  const dynamicRoutes = require('./router/dynamicRoutes.js');

  const app = express();

  // which route are we hitting ?
  app.use(morgan('dev'));

  // our app has two routers running
  // static router will server static content
  // dynamic router will serve dynamic services
  // we could also make an API only router ...etc

  app.use(staticRouter);
  app.use(dynamicRouter);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // handling errors - part1
  app.use((req, res, next) => {
    next(createHttpError.NotFound());
  });
  // handling errors - part2
  app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.send(error);
  });

  staticRouter.get('/', staticRoutes.AppHome);

  dynamicRouter.get('/test', (req, res) => {
    // you can activate this in case of other fails ..
    res.send('This is from Dynamic Router test ... ');
  });

  // working with mongodb using mongoose ORM, and mongo compass, mongodb atlas cloud
  mongoose
    .connect(process.env.HOST, {
      dbname: process.env.DB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        "\nWe've successfully connected to the database server ...\n"
      );
      // after we've connecteed to the db server then we start the web server ...
      app.listen(config.PORT, () => {
        console.log(
          `Your application server is now running on port: ${config.PORT}`
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

try {
  StartMyApp();
} catch (err) {
  console.log(err);
  StartMyApp();
}
