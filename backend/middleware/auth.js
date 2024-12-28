const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const authenticationMid = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing!' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'You must be logged in to access this app!' });
    }

    const decodedData = jwt.verify(token, 'SECRETTOKEN');
    if (!decodedData) {
      return res.status(401).json({ message: 'Invalid access token!' });
    }

    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const rolechecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'You do not have permission to enter!' });
    }
    next();
  };
};

module.exports = { authenticationMid, rolechecked };
