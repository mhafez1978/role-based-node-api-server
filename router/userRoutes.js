const main = (req, res) => {
  // console.log(req.method);
  // console.log(req.url)
  if (req.method === 'GET' && req.url === '/') {
    res.send('main user Dashboard route');
  }
  if (req.method === 'GET' && req.url === '/profile') {
    res.send('user profile');
  }
};

module.exports = { main };
