const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Bed = require('../models/Bed');

// Create a new room
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('beds');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('beds');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a room by ID
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a room by ID
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bed routes

// Create a new bed
router.post('/:roomId/beds', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const bed = new Bed({ ...req.body, room: room._id });
    await bed.save();

    room.beds.push(bed._id);
    await room.save();

    res.status(201).json(bed);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all beds in a room
router.get('/:roomId/beds', async (req, res) => {
  try {
    const beds = await Bed.find({ room: req.params.roomId }).populate('patient');
    res.json(beds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a bed by ID
router.put('/beds/:bedId', async (req, res) => {
  try {
    const bed = await Bed.findByIdAndUpdate(req.params.bedId, req.body, { new: true });
    if (!bed) return res.status(404).json({ message: 'Bed not found' });
    res.json(bed);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a bed by ID
router.delete('/beds/:bedId', async (req, res) => {
  try {
    const bed = await Bed.findByIdAndDelete(req.params.bedId);
    if (!bed) return res.status(404).json({ message: 'Bed not found' });

    // Remove bed from room's beds array
    await Room.findByIdAndUpdate(bed.room, { $pull: { beds: bed._id } });

    res.json({ message: 'Bed deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
