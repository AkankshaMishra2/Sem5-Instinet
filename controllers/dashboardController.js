const User = require('../models/User');
const Course = require('../models/courses');

exports.getAdminDashboard = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const totalUsers = users.length;
    const students = users.filter(user => user.role === 'student').length;
    const staff = users.filter(user => user.role === 'staff').length;
    const courses = await Course.countDocuments();

    res.render('adminDashboard', { 
      title: 'Admin Dashboard', 
      user: req.user, 
      users,
      stats: {
        totalUsers,
        students,
        staff,
        courses
      }
    });
  } catch (error) {
    console.error('Error in getAdminDashboard:', error);
    req.flash('error', 'Error loading dashboard');
    res.redirect('/login');
  }
};

exports.getStaffDashboard = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).lean();
    for (let student of students) {
      if (student.studentDetails && student.studentDetails.department) {
        student.courses = await Course.find({ department: student.studentDetails.department }).lean();
      } else {
        student.courses = [];
      }
    }
    res.render('staffDashboard', {
      title: 'Staff Dashboard',
      user: req.user,
      students,
      error: req.flash('error'),
      success: req.flash('success'),
      path: req.path
    });
  } catch (err) {
    console.error('Error in getStaffDashboard:', err);
    req.flash('error', 'Error loading dashboard');
    res.redirect('/login');
  }
};

exports.getStudentDashboard = async (req, res) => {
  const department = req.user.studentDetails?.department;
  const courses = await Course.find({ department }).limit(4);
  res.render('studentDashboard', {
    title: 'Student Dashboard',
    user: req.user,
    courses
  });
}; 