const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Add a new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

// Register user
router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('password').isStrongPassword().withMessage('Password must include uppercase, lowercase, numbers, and symbols'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ 
      message: 'User registered successfully',
      token
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to register', error: error.toString() });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
