import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Library API is running' });
});

// API Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
