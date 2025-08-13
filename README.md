# Hospital Management System

A comprehensive full-stack hospital management system built with React.js frontend and Node.js/Express backend with MongoDB database. This system provides complete management capabilities for hospitals including patient management, doctor scheduling, appointments, billing, pharmacy, lab tests, and administrative functions.

## 🏥 Project Overview

This hospital management system is designed to streamline hospital operations by providing an integrated platform for managing various aspects of hospital administration including:

- **Patient Management**
- **Doctor Scheduling & Management**

# B_Premier Hospital Management System

## Overview
B_Premier Hospital is a full-stack healthcare management system designed to streamline hospital operations. It features role-based access for admins, doctors, receptionists, and patients, supporting user management, appointments, billing, pharmacy, lab tests, and more.

## Technologies Used
- **Frontend:** React (with Tailwind CSS)
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)

## Project Structure
```
HOSPITAL/
├── backend/
│   ├── models/           # Mongoose models for all entities
│   ├── routes/           # Express route handlers (REST API)
│   ├── middleware/       # Auth and other middleware
│   ├── seed.js           # Database seeding script
│   ├── index.js          # Backend server entry point
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/   # React components (by role)
│   │   ├── App.js        # Main app component
│   │   └── ...           # Other React files
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── ...
├── README.md             # Project documentation
└── ...
```

## Features
- **Authentication:** JWT-based login for all roles
- **Admin Dashboard:** Manage users, view reports, system settings, access controls
- **Doctor Dashboard:** View appointments, manage patients, request lab tests
- **Receptionist Dashboard:** Register patients, manage appointments, billing
- **Patient Dashboard:** View appointments, bills, lab results
- **Pharmacy & Lab:** Manage medicines, lab tests
- **Room & Bed Management:** Assign rooms/beds to patients

## How to Run
### Backend
1. Install dependencies: `npm install` in `backend/`
2. Set up `.env` with MongoDB URI and JWT secret
3. Seed the database: `node seed.js`
4. Start server: `node index.js` or `npm start`

### Frontend
1. Install dependencies: `npm install` in `frontend/`
2. Start app: `npm start`
3. Build app: `npm run build`

## API Endpoints
- `/api/auth/login` - User login
- `/api/users` - User CRUD (admin only)
- `/api/appointments` - Appointment management
- `/api/billing` - Billing management
- `/api/pharmacy` - Pharmacy management
- `/api/lab` - Lab test management
- `/api/room` - Room management
- ...and more

## Database Seeding
- Run `node backend/seed.js` to populate the database with sample users and data.
- Default admin accounts: `admin1/adminpass`, `BAKARI ABDALLA/bakari`

## Notes
- All passwords are hashed before storage.
- Role-based access enforced via middleware.
- Frontend and backend communicate via REST API (proxy set in frontend).

## Contributing
1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

## License
MIT

---

This README provides a complete overview for AI or documentation tools to generate full project documentation.
│   │   ├── billingRoutes.js # Billing operations
│   │   ├── pharmacyRoutes.js # Pharmacy management
│   │   ├── labRoutes.js     # Lab test operations
│   │   ├── roomRoutes.js    # Room management
│   │   └── adminDashboardRoutes.js # Admin operations
│   ├── middleware/          # Custom middleware
│   │   └── auth.js        # Authentication middleware
│   ├── index.js            # Server entry point
│   ├── seed.js            # Database seeding
│   └── package.json       # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.js   # Login component
│   │   │   ├── Register.js # Registration component
│   │   │   ├── admin/   # Admin components
│   │   │   ├── doctor/  # Doctor components
│   │   │   └── patient/ # Patient components
│   │   ├── App.js        # Main application component
│   │   └── index.js      # React entry point
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── package.json          # Root package.json
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hospital-management-system
```

2. **Install root dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

### Environment Setup

1. **Backend Environment Variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hospital_management
JWT_SECRET=your_jwt_secret_key_here
```

2. **Frontend Configuration**
The frontend is configured to proxy requests to the backend on port 5000.

### Running the Application

1. **Start the complete application** (from root directory)
```bash
npm start
```
This will start both backend and frontend concurrently.

2. **Start backend only**
```bash
cd backend
npm start
```

3. **Start frontend only**
```bash
cd frontend
npm start
```

### Database Setup

1. **Seed the database** (optional - for demo data)
```bash
cd backend
node seed.js
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Patient Management
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctor Management
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create new doctor
- `GET /api/doctors/:id` - Get doctor by ID
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointment Management
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Billing Management
- `GET /api/billing` - Get all bills
- `POST /api/billing` - Create new bill
- `GET /api/billing/:id` - Get bill by ID
- `PUT /api/billing/:id` - Update bill
- `DELETE /api/billing/:id` - Delete bill

### Pharmacy Management
- `GET /api/pharmacy` - Get all pharmacy items
- `POST /api/pharmacy` - Create new pharmacy item
- `GET /api/pharmacy/:id` - Get pharmacy item by ID
- `PUT /api/pharmacy/:id` - Update pharmacy item
- `DELETE /api/pharmacy/:id` - Delete pharmacy item

### Lab Test Management
- `GET /api/lab` - Get all lab tests
- `POST /api/lab` - Create new lab test
- `GET /api/lab/:id` - Get lab test by ID
- `PUT /api/lab/:id` - Update lab test
- `DELETE /api/lab/:id` - Delete lab test

### Room Management
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room
- `GET /api/rooms/:id` - Get room by ID
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

## 📊 Database Schema

### User Schema
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['admin', 'doctor', 'receptionist', 'patient']),
  createdAt: Date
}
```

### Patient Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  dateOfBirth: Date,
  gender: String,
  phone: String,
  email: String,
  address: String,
  medicalHistory: Array,
  createdAt: Date
}
```

### Doctor Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  department: String (required),
  availability: Array,
  phone: String (required),
  email: String (unique, required),
  createdAt: Date
}
```

### Appointment Schema
```javascript
{
  patient: ObjectId (ref: Patient),
  doctor: ObjectId (ref: Doctor),
  date: Date,
  time: String,
  status: String,
  notes: String,
  createdAt: Date
}
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running on your system
   - Check the connection string in `.env` file
   - Verify MongoDB service is active

2. **Port Already in Use**
   - Change the port in `.env` file
   - Kill the process using the port:
     ```bash
     # Windows
     netstat -ano | findstr :5000
     taskkill /PID <PID> /F
     ```

3. **CORS Issues**
   - Ensure CORS is properly configured in backend
   - Check if the frontend proxy is correctly set

4. **Build Issues**
   - Clear node_modules and reinstall:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

## 🚀 Deployment

### Production Build

1. **Build the frontend**
```bash
cd frontend
npm run build
```

2. **Start production server**
```bash
cd backend
NODE_ENV=production npm start
```

### Docker Deployment (Optional)

Create a `Dockerfile` for containerized deployment:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: [Your Name]
- **Backend Developer**: [Developer Name]
- **Frontend Developer**: [Developer Name]
- **UI/UX Designer**: [Designer Name]

## 📞 Support

For support, email support@hospitalmanagement.com or join our Slack channel.

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Basic CRUD operations for all entities
- Authentication system
- Dashboard implementation
- Responsive design

---

**Note**: This is a comprehensive hospital management system designed for educational and demonstration purposes. For production use, additional security measures and optimizations should be implemented.
