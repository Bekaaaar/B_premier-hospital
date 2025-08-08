const express = require('express');
const router = express.Router();
const LabTest = require('../models/LabTest');

// Create a new lab test request
router.post('/', async (req, res) => {
  try {
    const labTest = new LabTest(req.body);
    await labTest.save();
    res.status(201).json(labTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all lab test requests
router.get('/', async (req, res) => {
  try {
    const labTests = await LabTest.find()
      .populate('patient')
      .populate('requestedBy');
    res.json(labTests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a lab test request by ID
router.get('/:id', async (req, res) => {
  try {
    const labTest = await LabTest.findById(req.params.id)
      .populate('patient')
      .populate('requestedBy');
    if (!labTest) return res.status(404).json({ message: 'Lab test not found' });
    res.json(labTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a lab test request by ID
router.put('/:id', async (req, res) => {
  try {
    const labTest = await LabTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!labTest) return res.status(404).json({ message: 'Lab test not found' });
    res.json(labTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a lab test request by ID
router.delete('/:id', async (req, res) => {
  try {
    const labTest = await LabTest.findByIdAndDelete(req.params.id);
    if (!labTest) return res.status(404).json({ message: 'Lab test not found' });
    res.json({ message: 'Lab test deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
