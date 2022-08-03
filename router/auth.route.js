const router = require('express').Router();
const controllers = require('../controllers/index')

router.get('/login', (req, res, next) => {
  res.render('login');
});
router.post('/login', (req, res, next) => {
  res.send('logging you in now ...');
});

router.get('/register', async(req, res, next) => {
  // req.flash('alert-danger','Waring all fields are required before we complete your request ...');
  // req.flash('alert-info','Hmmm, looks like more information is needed ...');
  // req.flash('alert-success','Great job, you\'ve signed up successfully ...');
  // req.flash('alert-primary','Great job, you\'ve signed up successfully ...');
  // req.flash('alert-secondary','Great job, you\'ve signed up successfully ...');
  // req.flash('alert-warning','Great job, you\'ve signed up successfully ...');
  // req.flash('alert-light','Great job, you\'ve signed up successfully ...');
  // req.flash('alert-dark','Great job, you\'ve signed up successfully ...');
  // // const messages = req.flash()
  // // lets create a onetime use only flash message to use 
  // res.redirect('/auth/login');
  res.render('register')
});
router.post('/register', (req, res, next) => {
  return controllers.register(req,res,next)
});

router.get('/logout', (req, res, next) => {
  res.render('index');
});

module.exports = router;
