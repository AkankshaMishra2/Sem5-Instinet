const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { authenticateUser, isAdmin } = require('../middleware/auth');
const User = require('../models/User');

// API route to get current user data
router.get('/current-user', authenticateUser, (req, res) => {
  // User is already attached to req by authenticateUser middleware
  const { password, ...userInfo } = req.user;
  res.json(userInfo);
});

// API routes example
router.get('/courses', (req, res) => {
  res.status(200).json({
    courses: [
      { id: 1, name: 'Computer Science', instructor: 'Dr. Smith', duration: '4 years' },
      { id: 2, name: 'Information Technology', instructor: 'Prof. Johnson', duration: '3 years' },
      { id: 3, name: 'Electronics Engineering', instructor: 'Dr. Williams', duration: '4 years' },
      { id: 4, name: 'Data Science', instructor: 'Prof. Brown', duration: '2 years' }
    ]
  });
});

// API route to get announcements
router.get('/announcements', (req, res) => {
  res.status(200).json({
    announcements: [
      { id: 1, title: 'Holiday Notice', content: 'Institute will be closed on Monday for National Holiday', date: '2025-05-01' },
      { id: 2, title: 'Exam Schedule', content: 'Final exams will start from June 15th', date: '2025-05-05' },
      { id: 3, title: 'Workshop Announcement', content: 'AI Workshop on May 20th', date: '2025-05-10' }
    ]
  });
});

// API route to get users (admin only)
router.get('/users', authenticateUser, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;