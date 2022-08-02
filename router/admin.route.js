const router = require('express').Router();

router.get('/dashboard', (req, res, next) => {
  res.render('adminDashboard');
});

router.get('/manage/users', (req, res, next) => {
  res.render('manage');
});

module.exports = router;
