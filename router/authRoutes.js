const main = (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.send('main auth index route');
  }

  if (req.method === 'GET' && req.url === '/login') {
    res.send('login');
  }

  if (req.method === 'GET' && req.url === '/register') {
    res.send('register');
  }

  if (req.method === 'POST' && req.url === '/login') {
    res.send('The POST login');
  }

  if (req.method === 'POST' && req.url === '/register') {
    res.send('the POST register');
  }

  if (req.method === 'GET' && req.url === '/logout') {
    res.send('logout');
  }
  
};

module.exports = { main };
