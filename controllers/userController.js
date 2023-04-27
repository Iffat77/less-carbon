import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

import * as dotenv from 'dotenv';
dotenv.config();


// Register user
// POST  /api/users
// Public
export const registerUser = asyncHandler( async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
 


   // Check if user exists 
   const userExists = await User.findOne({email})
  
    if (userExists) {
     res.status(400)
     throw new Error('User already exists')
    } 

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User 
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

// res.json({ message: "Register User" });

// Authenticate user
// POST  /api/login
// Public
export const loginUser = asyncHandler( async (req, res) => {
  try {
    const {email , password} = req.body

    // Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid Credentials')
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user data
// GET  /api/users/me
// Private


export const getUser = asyncHandler( async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
      id: _id,
      name,
      email,
    })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
}