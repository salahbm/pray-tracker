// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error-handler';

// Import routes
import userRoutes from './routes/user.routes';
import prayerRoutes from './routes/prayer.routes';
import friendRoutes from './routes/friend.routes';
import awardRoutes from './routes/awards.routes';
import proRoutes from './routes/pro.routes';

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/prayers', prayerRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/pro', proRoutes);

// Error handling middleware must be after routes
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
