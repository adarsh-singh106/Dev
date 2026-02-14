import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Routes
import authRoutes from './routes/auth.routes.js';


const app: Application = express();

// 1. Global Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Mount Auth Routes
app.use('/api/auth',authRoutes);

// test
app.get('/',(req:Request,res:Response) => {
  res.status(200).json(
    {
      message:"API is Running !"
    }
  )
})

export default app;