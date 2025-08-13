const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Room = require('../models/Room');

// Get today's appointments with patient and doctor details
router.get('/appointments/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const appointments = await Appointment.find({ date: today })
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialization')
      .sort({ time: 1 });
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check-in patient
router.put('/appointments/:id/checkin', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'checked-in',
        checkInTime: new Date()
      },
      { new: true }
    ).populate('patient', 'name email phone')
     .populate('doctor', 'name specialization');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Check-out patient
router.put('/appointments/:id/checkout', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'completed',
        checkOutTime: new Date()
      },
      { new: true }
    ).populate('patient', 'name email phone')
     .populate('doctor', 'name specialization');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find()
      .select('name email phone dateOfBirth')
      .sort({ name: 1 });
    
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get room status
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find()
      .sort({ roomNumber: 1 });
    
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const [totalAppointments, checkedInPatients, availableRooms, totalPatients] = await Promise.all([
      Appointment.countDocuments({ date: today }),
      Appointment.countDocuments({ date: today, status: 'checked-in' }),
      Room.countDocuments({ status: 'available' }),
      Patient.countDocuments()
    ]);
    
    res.json({
      totalAppointments,
      checkedInPatients,
      availableRooms,
      totalPatients
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
