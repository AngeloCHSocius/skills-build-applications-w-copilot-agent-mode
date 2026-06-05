import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import { MONGODB_URI, PORT } from './config.js';

dotenv.config();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB on port 27017');
    app.listen(PORT, () => {
      console.log(`Backend server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
