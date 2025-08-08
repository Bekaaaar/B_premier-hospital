require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  console.info(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital Management System API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations for the OpenAPI Specification
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic route
app.get('/', (req, res) => {
  res.send('Hospital Management System API');
});

// Patient routes
const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

// Doctor routes
const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctors', doctorRoutes);

// Appointment routes
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

// Billing routes
const billingRoutes = require('./routes/billingRoutes');
app.use('/api/billing', billingRoutes);

// Pharmacy routes
const pharmacyRoutes = require('./routes/pharmacyRoutes');
app.use('/api/pharmacy', pharmacyRoutes);

// Lab routes
const labRoutes = require('./routes/labRoutes');
app.use('/api/lab', labRoutes);

// Admin dashboard routes
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
const { auth, authorize } = require('./middleware/auth');
app.use('/api/admin-dashboard', auth, authorize('admin'), adminDashboardRoutes);

// Room routes
const roomRoutes = require('./routes/roomRoutes');
app.use('/api/rooms', roomRoutes);

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', auth, authorize('admin'), userRoutes);

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
