const router = require('express').Router();
const controllers = require('../controllers/index')

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  return controllers.register(req,res,next)
});

router.get('/logout', (req, res, next) => {
  res.render('index');
});

module.exports = router;
