const AppHome = (req, res) => {
  res.render('index');
};

const AppContact = (req, res) => {
  res.render('contact');
};

module.exports = { AppHome, AppContact };
