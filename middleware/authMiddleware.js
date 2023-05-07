import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const secret = process.env.JWT_SECRET;

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, secret);

      // Check token expiration
      if (Date.now() >= decoded.exp * 1000) {
        res.status(401);
        throw new Error('Token expired');
      }

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      // Calling next piece of middleware
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Invalid token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No token');
  }
});

export default protect;
