const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  amount: { type: Number, required: true },
  insuranceProvider: { type: String },
  insuranceNumber: { type: String },
  status: { type: String, enum: ['Pending', 'Paid', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Billing', billingSchema);
