const router = require('express').Router();
const controllers = require('../controllers/index')
const { body, validationResult } = require('express-validator');

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
  res.render('register');
});
router.post('/register',
  // lets clean input from user and sanitize it using express-validator
  body('fname').trim().isLength({min:3}).withMessage('First Name is required ...'),
  body('fname').trim().isLength({min:3}).withMessage('Last Name is required ...'),
  body('username').trim().isLength({min:5}).withMessage('Username require minimum 5 char(s) ...'),
  body('email').trim().isEmail().withMessage('Email must be a valid ...').normalizeEmail().toLowerCase(),
	body('password').isLength({min:8}).withMessage('Password must be 8 characters long ...'),
  body('passwordConfirmation').custom((value,{req})=>{
    if(value !== req.body.password){
      throw new Error('Password and password confirmation must be the same ...')
    }
    return true;
  }),
  async(req, res, next) => {
  const errors = validationResult(req);
  return controllers.register(req, res, errors, next)
});

router.get('/logout', (req, res, next) => {
  res.render('index');
});

module.exports = router;
