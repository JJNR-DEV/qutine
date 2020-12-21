const jwt = require('jsonwebtoken');

// Middleware for protected routes
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if(!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) {
      return res.status(401).send('Access Denied');
    }
    next();
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

module.exports.verifyToken = verifyToken;
