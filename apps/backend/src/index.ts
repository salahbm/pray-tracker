// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'http';
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
const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '0.0.0.0';

// Enable CORS for all origins
app.use(cors());

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

function startServer(port: number) {
  const server = http.createServer(app);
  server.listen(port, host, () => {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const domain = process.env.DOMAIN || `localhost:${port}`;
    console.log(`Server is running on ${protocol}://${domain}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

startServer(port);
