import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

const secret = process.env.JWT_SECRET

const protect = asyncHandler(async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, secret)

      // Get user from the token 
      req.user = await User.findById(decoded.id).select('-password')
      
      // Calling next peice of middleware
      next()
    } catch (error){
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, No token')
  }
})


export default protect