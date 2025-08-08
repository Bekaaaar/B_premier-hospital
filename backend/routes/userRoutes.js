const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID (admin only)
router.get('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user (admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { username: username },
        { email: email }
      ]
    });
    
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    user = new User({
      username,
      email,
      password,
      role
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a user by ID (admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { username, email, role } = req.body;
    
    // Build update object
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (role) updateFields.role = role;
    
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      updateFields, 
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user by ID (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
