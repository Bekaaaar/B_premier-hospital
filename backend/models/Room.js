const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['General', 'ICU', 'Private'], required: true },
  beds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bed' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', roomSchema);
