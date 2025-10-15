require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'your_mongodb_uri', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));
app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const authRoutes = require('./routes/auth');
const pageRoutes = require('./routes/pages');
const profileRoutes = require('./routes/profile');
const apiRoutes = require('./routes/api');
const announcementRoutes = require('./routes/announcements');

// Use routes
app.use('/', authRoutes);
app.use('/', pageRoutes);
app.use('/', profileRoutes);
app.use('/api', apiRoutes);
app.use('/announcements', announcementRoutes);

// Debug middleware
app.use((req, res, next) => {
    console.log('Request received:', req.method, req.url);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    title: 'Error',
    status: err.status || 500,
    message: err.message || 'Something went wrong!',
    description: err.description || null
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { 
    title: '404 - Page Not Found',
    status: 404,
    message: 'The page you are looking for does not exist.',
    description: null
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});