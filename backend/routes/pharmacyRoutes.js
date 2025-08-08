const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');

// Create a new medicine inventory record
router.post('/', async (req, res) => {
  try {
    const pharmacy = new Pharmacy(req.body);
    await pharmacy.save();
    res.status(201).json(pharmacy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all medicine inventory records
router.get('/', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a medicine inventory record by ID
router.get('/:id', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
    if (!pharmacy) return res.status(404).json({ message: 'Medicine not found' });
    res.json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a medicine inventory record by ID
router.put('/:id', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pharmacy) return res.status(404).json({ message: 'Medicine not found' });
    res.json(pharmacy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a medicine inventory record by ID
router.delete('/:id', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!pharmacy) return res.status(404).json({ message: 'Medicine not found' });
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
