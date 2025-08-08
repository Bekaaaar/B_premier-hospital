const mongoose = require('mongoose');
const User = require('./models/User');
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const Billing = require('./models/Billing');
const Pharmacy = require('./models/Pharmacy');
const LabTest = require('./models/LabTest');
const Room = require('./models/Room');
const AdminDashboard = require('./models/AdminDashboard');

const connectDB = async (uri) => {
  try {
    if (!uri) {
      throw new Error('MongoDB connection string is required');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    await Billing.deleteMany({});
    await Pharmacy.deleteMany({});
    await LabTest.deleteMany({});
    await Room.deleteMany({});
    await AdminDashboard.deleteMany({});

    // Seed Users
    // Note: You can log in with either the username or email field
    const users = [
      { username: 'admin1', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
      { username: 'doctor1', email: 'doctor1@example.com', password: 'doctorpass', role: 'doctor' },
      { username: 'reception1', email: 'reception1@example.com', password: 'receptionpass', role: 'receptionist' },
      { username: 'patient1', email: 'patient1@example.com', password: 'patientpass', role: 'patient' },
      { username: 'BAKARI ABDALLA', email: 'bekamwakidudu@gmail.com', password: 'bakari', role: 'admin' }, // Can log in with 'BAKARI ABDALLA' or 'bekamwakidudu@gmail.com'
      { username: 'Joshua Atieno', email: 'josh@gmail.com', password: 'joshua', role: 'doctor' } // New doctor user
    ];
    for (const user of users) {
      const newUser = new User(user);
      await newUser.save();
    }

    // Seed Patients
    const patients = [
      { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', phone: '1234567890', dob: new Date('1993-01-01'), gender: 'Male' },
      { firstName: 'Jane', lastName: 'Smith', email: 'janesmith@example.com', phone: '0987654321', dob: new Date('1998-01-01'), gender: 'Female' },
    ];
    for (let i = 0; i < patients.length; i++) {
      const newPatient = new Patient(patients[i]);
      const savedPatient = await newPatient.save();
      patients[i]._id = savedPatient._id; // Store the ID for use in appointments and billing
    }

    // Seed Doctors
    const doctors = [
      { firstName: 'Gregory', lastName: 'House', email: 'house@example.com', phone: '1112223333', department: 'Diagnostics', specialty: 'Diagnostics' },
      { firstName: 'Stephen', lastName: 'Strange', email: 'strange@example.com', phone: '4445556666', department: 'Surgery', specialty: 'Surgery' },
      { firstName: 'Joshua', lastName: 'Atieno', email: 'josh@gmail.com', phone: '1234567890', department: 'General Medicine', specialty: 'General Practitioner' }
    ];
    for (let i = 0; i < doctors.length; i++) {
      const newDoctor = new Doctor(doctors[i]);
      const savedDoctor = await newDoctor.save();
      doctors[i]._id = savedDoctor._id; // Store the ID for use in appointments and lab tests
    }

    // Seed Rooms
    const rooms = [
      { roomNumber: '101', type: 'General' },
      { roomNumber: '102', type: 'ICU' },
    ];
    for (const room of rooms) {
      const newRoom = new Room(room);
      await newRoom.save();
    }

    // Seed Appointments
    const appointments = [
      { patient: patients[0]._id, doctor: doctors[0]._id, appointmentDate: new Date(), status: 'Scheduled' },
      { patient: patients[1]._id, doctor: doctors[1]._id, appointmentDate: new Date(), status: 'Completed' },
    ];
    for (let i = 0; i < appointments.length; i++) {
      const newAppointment = new Appointment(appointments[i]);
      const savedAppointment = await newAppointment.save();
      appointments[i]._id = savedAppointment._id; // Store the ID for use in billing
    }

    // Seed Billing
    const billings = [
      { patient: patients[0]._id, appointment: appointments[0]._id, amount: 200, status: 'Paid' },
      { patient: patients[1]._id, appointment: appointments[1]._id, amount: 150, status: 'Pending' },
    ];
    for (const billing of billings) {
      const newBilling = new Billing(billing);
      await newBilling.save();
    }

    // Seed Pharmacy
    const pharmacies = [
      { medicineName: 'Paracetamol', quantity: 100, expiryDate: new Date('2025-12-31'), supplier: 'Supplier A', price: 5.99 },
      { medicineName: 'Ibuprofen', quantity: 50, expiryDate: new Date('2026-06-30'), supplier: 'Supplier B', price: 7.99 },
    ];
    for (const pharmacy of pharmacies) {
      const newPharmacy = new Pharmacy(pharmacy);
      await newPharmacy.save();
    }

    // Seed Lab Tests
    const labTests = [
      { patient: patients[0]._id, testName: 'Blood Test', requestedBy: doctors[0]._id, status: 'Requested' },
      { patient: patients[1]._id, testName: 'X-Ray', requestedBy: doctors[1]._id, status: 'In Progress' },
    ];
    for (const labTest of labTests) {
      const newLabTest = new LabTest(labTest);
      await newLabTest.save();
    }

    // Seed Admin Dashboard (if applicable)
    const adminDashboards = [
      { name: 'Total Patients', value: 2 },
      { name: 'Total Doctors', value: 2 },
    ];
    for (const adminDashboard of adminDashboards) {
      const newAdminDashboard = new AdminDashboard(adminDashboard);
      await newAdminDashboard.save();
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

const runSeed = async () => {
  const uri = process.argv[2];
  await connectDB(uri);
  await seedData();
};

runSeed();
