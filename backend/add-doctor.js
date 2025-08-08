const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');

// Use a local MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital';

async function addDoctor() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Add the user
    const user = new User({
      username: 'Joshua Atieno',
      email: 'josh@gmail.com',
      password: 'joshua',
      role: 'doctor'
    });
    
    const savedUser = await user.save();
    console.log('User created:', savedUser.username);

    // Add the doctor profile
    const doctor = new Doctor({
      firstName: 'Joshua',
      lastName: 'Atieno',
      email: 'josh@gmail.com',
      phone: '1234567890',
      department: 'General Medicine',
      specialty: 'General Practitioner'
    });
    
    const savedDoctor = await doctor.save();
    console.log('Doctor profile created:', savedDoctor.firstName, savedDoctor.lastName);

    console.log('Doctor Joshua Atieno has been successfully added to the system!');
    console.log('Login credentials:');
    console.log('Email: josh@gmail.com');
    console.log('Password: joshua');
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding doctor:', error);
    process.exit(1);
  }
}

addDoctor();
