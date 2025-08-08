const express = require('express');
const router = express.Router();
const Billing = require('../models/Billing');

// Create a new billing record
router.post('/', async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res.status(201).json(billing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all billing records
router.get('/', async (req, res) => {
  try {
    const billings = await Billing.find()
      .populate('patient')
      .populate('appointment');
    res.json(billings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a billing record by ID
router.get('/:id', async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id)
      .populate('patient')
      .populate('appointment');
    if (!billing) return res.status(404).json({ message: 'Billing record not found' });
    res.json(billing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a billing record by ID
router.put('/:id', async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!billing) return res.status(404).json({ message: 'Billing record not found' });
    res.json(billing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a billing record by ID
router.delete('/:id', async (req, res) => {
  try {
    const billing = await Billing.findByIdAndDelete(req.params.id);
    if (!billing) return res.status(404).json({ message: 'Billing record not found' });
    res.json({ message: 'Billing record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
