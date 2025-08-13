const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'No authentication token provided',
        code: 'NO_TOKEN'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Use decoded.user.id to match login token payload
    const userId = decoded.user?.id || decoded.id;
    req.user = await User.findById(userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ 
        message: 'User account not found',
        code: 'USER_NOT_FOUND'
      });
    }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Authentication token has expired',
        code: 'TOKEN_EXPIRED'
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid authentication token',
        code: 'INVALID_TOKEN'
      });
    } else {
      return res.status(401).json({ 
        message: 'Authentication failed',
        code: 'AUTH_FAILED'
      });
    }
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. ${roles.join(' or ')} role required`,
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }
    
    next();
  };
};

module.exports = { auth, authorize };
