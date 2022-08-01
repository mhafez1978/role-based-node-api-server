const StartMyApp = () => {
  const config = require('./config');
  const express = require('express');
  
  const { Router } = require('express');

  const createHttpError = require('http-errors');
  const morgan = require('morgan');
  const mongoose = require('mongoose');

  const staticRouter = Router();
  const dynamicRouter = Router();
  const authRouter = Router();
  const userRouter = Router();

  const staticRoutes = require('./router/staticRoutes.js');

  const dynamicRoutes = require('./router/dynamicRoutes.js');

  const authRoutes = require('./router/authRoutes.js');

  const userRoutes = require('./router/userRoutes.js');

  const app = express();

  // lets set the app to use specific views engine in this case ejs, but could use anything else ...
  app.set('view engine', 'ejs');

  // lets register public folder with express so we can use in our project
  app.use(express.static('public'));

  // which route are we hitting ?
  app.use(morgan('dev'));

  // our app has two routers running
  // static router will server static content
  // dynamic router will serve dynamic services
  // we could also make an API only router ...etc

  app.use(staticRouter);
  app.use(dynamicRouter);
  app.use(authRouter);
  app.use(userRouter);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // handling errors - part1
  // if this is true kick off next (part2)
  app.use((req, res, next) => {
    next(createHttpError.NotFound());
  });
  // handling errors - part2
  app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.render('404');
  });

  // nested style rouuter
  staticRouter.get('/', staticRoutes.AppHome);
  staticRouter.get('/contact', staticRoutes.AppContact);

  dynamicRouter.get('/test', dynamicRoutes.Test);
  // direct functional routing based on request and method of request
  authRouter.use('/auth', authRoutes.main);
  userRouter.use('/user', userRoutes.main);

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
