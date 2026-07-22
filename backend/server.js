import app from './app.js';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB database via Mongoose
connectDB();

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please kill the process using port ${PORT} or restart.`);
  } else {
    console.error('Server error:', err);
  }
});
