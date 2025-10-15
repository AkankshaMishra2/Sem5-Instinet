// Handles user login, registration, and logout.

const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const authController = require('../controllers/authController');

// Login and register page routes
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', error: null });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', error: null });
});

// Logout route
router.get('/logout', (req, res) => {
  res.clearCookie('userEmail');
  res.redirect('/login');
});

// POST route for registration
router.post('/register', authController.register);

// POST route for login
router.post('/login', authController.login);

module.exports = router;