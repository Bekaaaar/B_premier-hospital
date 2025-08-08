const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  availability: [{
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  }],
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Doctor', doctorSchema);
