const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  medicalHistory: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', patientSchema);
