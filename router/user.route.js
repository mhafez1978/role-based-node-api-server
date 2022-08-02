const router = require('express').Router();

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/dashboard', (req, res, next) => {
  res.render('userDashboard');
});

module.exports = router;
