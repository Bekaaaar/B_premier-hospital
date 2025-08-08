const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  supplier: { type: String },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);
