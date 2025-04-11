// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errorHandler } from './middleware/error-handler';

// Import routes
import userRoutes from './routes/user.routes';
import prayerRoutes from './routes/prayer.routes';
import friendRoutes from './routes/friend.routes';
import awardRoutes from './routes/awards.routes';
import proRoutes from './routes/pro.routes';
import authRoutes from './routes/auth.routes';

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/prayers', prayerRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/pro', proRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware must be after routes
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
