const main = (req, res) => {
  // console.log(req.method);
  // console.log(req.url)
  if (req.method === 'GET' && req.url === '/') {
    res.render('userDashboard');
  }

  if (req.method === 'GET' && req.url === '/profile') {
    res.render('profile');
  }
  
};

module.exports = { main };
