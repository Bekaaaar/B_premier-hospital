const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  isOccupied: { type: Boolean, default: false },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bed', bedSchema);
