const StartMyApp = () => {
  const path = require('path');
  const config = require('./config');
  const express = require('express');
  const createHttpError = require('http-errors');
  const morgan = require('morgan');
  const db = require('mongoose');
  const session = require('express-session');
  const flash = require('connect-flash');

  const app = express();

  

  // lets set the app to use specific views engine in this case ejs, but could use anything else ...
  app.set('view engine', 'ejs');

  // lets register public folder with express so we can use in our project
  app.use('/public', express.static(path.resolve('./public')));
  // app.use(express.static('public'))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  
  // init session this will be used in connect flash package and in passport for auth ...
  app.use(session({
    secret: process.env.SESSION_SECRET,
    // stop from saving in session store
    resave: false,
    // stop from saving in session store, help with race conditions ...
    saveUninitialized:false,
    // let's initialize the browser session cookie
    cookie:{
      // when using https://
      // secure:true
      // since we in dev now will comment it out
      
      // the following will prevent cookie snooping software or browsers from reading our cookie
      // only server can read ...
      httpOnly:true,
    }
  }));

  // init connect flash messages
  app.use(flash());
  app.use((req,res,next)=>{
    res.locals.messages = req.flash();
    next();
  })

  // App Routes
  app.use('/', require('./router/index.route'));
  app.use('/user', require('./router/user.route'));
  app.use('/admin', require('./router/admin.route'));
  app.use('/auth', require('./router/auth.route'));

  // let's log requests in console
  

  // handling errors - part1
  // if route is unknown to our app our error handling should be triggered
  // this is true kick off next with the error (part2)
  app.use((req, res, next) => {
    next(createHttpError.NotFound());
  });
  // handling errors - part2
  app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status).render('404',{error,req});
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
          `Your application server is now running on http://localhost:${config.PORT}\n\n`
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
