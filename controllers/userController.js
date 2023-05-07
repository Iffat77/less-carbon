import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import * as dotenv from 'dotenv';
dotenv.config();


// Register user
// POST /api/users
// Public
export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Authenticate user
// POST /api/login
// Public
export const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user._id);

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user data
// GET /api/users/me
// Private
export const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
