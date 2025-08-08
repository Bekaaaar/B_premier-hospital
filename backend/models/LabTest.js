const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  testName: { type: String, required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  status: { type: String, enum: ['Requested', 'In Progress', 'Completed'], default: 'Requested' },
  reportUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LabTest', labTestSchema);
