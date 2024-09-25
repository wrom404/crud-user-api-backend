import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import userRoutes from './routes/user.route.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running at port ${PORT}`)
});