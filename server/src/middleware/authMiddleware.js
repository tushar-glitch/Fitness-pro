const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};