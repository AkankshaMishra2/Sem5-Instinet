const express = require('express');
const router = express.Router();
const { authenticateUser, isAdmin } = require('../middleware/auth');
const profileController = require('../controllers/profileController');

// User profile routes
router.get('/profile', authenticateUser, profileController.getProfile);
router.get('/profile/edit', authenticateUser, profileController.editProfile);
router.post('/profile/update', authenticateUser, profileController.updateProfile);

// Admin routes for managing users
router.get('/admin/users', authenticateUser, isAdmin, profileController.getAllUsers);
router.get('/admin/users/:id', authenticateUser, isAdmin, profileController.getUser);
router.post('/admin/users/:id/update', authenticateUser, isAdmin, profileController.updateUser);
router.post('/admin/users/:id/delete', authenticateUser, isAdmin, profileController.deleteUser);

module.exports = router;