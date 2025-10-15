const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  try {
      console.log('Creating announcement:', req.body); // Debug log
      const { title, message } = req.body;
      
      if (!title || !message) {
          req.flash('error', 'Title and message are required');
          return res.redirect('/staffDashboard');
      }

      const announcement = await Announcement.create({
          title,
          message,
          createdBy: req.user._id
      });
      
      console.log('Announcement created:', announcement); // Debug log
      req.flash('success', 'Announcement created successfully!');
      res.redirect('/staffDashboard');
  } catch (err) {
      console.error('Error creating announcement:', err);
      req.flash('error', 'Failed to create announcement');
      res.redirect('/staffDashboard');
  }
};
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'firstName lastName role');
    res.render('announcements', { 
      user: req.user, 
      announcements, 
      title: 'Announcements',
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (err) {
    req.flash('error', 'Failed to fetch announcements');
    res.redirect('/staffDashboard');
  }
};

exports.getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('createdBy', 'firstName lastName role');
    if (!announcement) {
      req.flash('error', 'Announcement not found');
      return res.redirect('/announcements');
    }
    res.render('announcementDetail', { 
      user: req.user, 
      announcement, 
      title: announcement.title 
    });
  } catch (err) {
    req.flash('error', 'Failed to fetch announcement');
    res.redirect('/announcements');
  }
};
