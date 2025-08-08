const express = require('express');
const router = express.Router();
const KPI = require('../models/AdminDashboard');

// Create or update a KPI
router.post('/', async (req, res) => {
  try {
    const { name, value } = req.body;
    let kpi = await KPI.findOne({ name });
    if (kpi) {
      kpi.value = value;
      kpi.date = new Date();
    } else {
      kpi = new KPI({ name, value });
    }
    await kpi.save();
    res.status(201).json(kpi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all KPIs
router.get('/', async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.json(kpis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
