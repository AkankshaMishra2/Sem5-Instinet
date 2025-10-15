const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  dateOfBirth: {
    type: Date
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  role: {
    type: String,
    enum: ['admin', 'staff', 'student'],
    required: true
  },
  studentDetails: {
    enrollmentNumber: { type: String, unique: true, sparse: true },
    department: String,
    courseName: String,
    year: Number,
    semester: Number,
    guardianName: String,
    guardianContact: String,
    isHostelResident: {
      type: Boolean,
      default: false
    },
    hasScholarship: {
      type: Boolean,
      default: false
    }
  },
  staffDetails: {
    department: String,
    designation: String,
    employeeId: {
      type: String,
      unique: true,
      sparse: true
    },
    dateOfJoining: Date,
    subjectsAssigned: [String],
    salary: Number
  },
  adminDetails: {
    employeeId: {
      type: String,
      unique: true,
      sparse: true
    },
    department: String,
    officeRoomNumber: String,
    accessLevel: {
      type: String,
      enum: ['basic', 'intermediate', 'full']
    },
    responsibilities: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// userSchema.index({ email: 1 });

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 