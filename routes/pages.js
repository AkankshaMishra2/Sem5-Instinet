const express = require('express');
const router = express.Router();
const { authenticateUser, isAdmin, isStaff, isStudent } = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

// Home page route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Dashboard routes with role-based access
router.get('/studentDashboard', authenticateUser, isStudent, dashboardController.getStudentDashboard);
router.get('/staffDashboard', authenticateUser, isStaff, dashboardController.getStaffDashboard);
router.get('/adminDashboard', authenticateUser, isAdmin, dashboardController.getAdminDashboard);

module.exports = router;