const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const receptionistSchema = new mongoose.Schema({
  // Basic Information
  employeeId: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => `REC-${Date.now().toString().slice(-8)}`
  },
  
  // Personal Details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  
  // Employment Details
  hireDate: { type: Date, default: Date.now },
  department: { type: String, default: 'Reception' },
  shift: { 
    type: String, 
    enum: ['morning', 'afternoon', 'night', 'flexible'],
    default: 'morning'
  },
  workingHours: {
    startTime: { type: String, default: '08:00' },
    endTime: { type: String, default: '17:00' }
  },
  
  // System Access
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  
  // Permissions
  permissions: {
    canCheckInPatients: { type: Boolean, default: true },
    canScheduleAppointments: { type: Boolean, default: true },
    canManageRooms: { type: Boolean, default: true },
    canViewPatientRecords: { type: Boolean, default: true },
    canProcessPayments: { type: Boolean, default: true },
    canGenerateReports: { type: Boolean, default: false },
    canModifySystemSettings: { type: Boolean, default: false }
  },
  
  // Performance Tracking
  performanceMetrics: {
    totalAppointmentsHandled: { type: Number, default: 0 },
    totalPatientsCheckedIn: { type: Number, default: 0 },
    averageCheckInTime: { type: Number, default: 0 },
    customerSatisfactionScore: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  
  // Emergency Contacts
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  
  // Additional Information
  profilePicture: { type: String },
  notes: { type: String },
  certifications: [{
    name: String,
    issuedBy: String,
    issueDate: Date,
    expiryDate: Date
  }],
  
  // System Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for performance
receptionistSchema.index({ employeeId: 1 });
receptionistSchema.index({ email: 1 });
receptionistSchema.index({ username: 1 });

// Virtual for full name
receptionistSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
receptionistSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
receptionistSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update timestamp on save
receptionistSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Receptionist', receptionistSchema);
