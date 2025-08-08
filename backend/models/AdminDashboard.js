const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('KPI', kpiSchema);
