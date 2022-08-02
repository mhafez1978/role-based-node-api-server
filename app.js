const StartMyApp = () => {
  const path = require('path');
  const config = require('./config');
  const express = require('express');
  const createHttpError = require('http-errors');
  const morgan = require('morgan');
  const db = require('mongoose');
  const app = express();

  // lets set the app to use specific views engine in this case ejs, but could use anything else ...
  app.set('view engine', 'ejs');

  // lets register public folder with express so we can use in our project
  app.use('/public', express.static(path.resolve('./public')));

  

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // App Routes
  app.use('/', require('./router/index.route'));
  app.use('/user', require('./router/user.route'));
  app.use('/admin', require('./router/admin.route'));
  app.use('/auth', require('./router/auth.route'));

  // let's log requests in console
  app.use(morgan('dev'));

  // handling errors - part1
  // if route is unknown to our app our error handling should be triggered
  // this is true kick off next with the error (part2)
  app.use((req, res, next) => {
    next(createHttpError.NotFound());
  });
  // handling errors - part2
  app.use((err, req, res, next) => {
    err.status = err.status || 500;
    res.status(err.status).render('404');
  });

  // working with mongodb using mongoose ORM, and mongo compass, mongodb atlas cloud
  db.connect(process.env.HOST, {
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
          `Your application server is now running on http://localhost:${config.PORT}`
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
