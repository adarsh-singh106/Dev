import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Application = express();

// 1. Global Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// 2. Test Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: '🚀 API is running professionally!', 
    timestamp: new Date().toISOString() 
  });
});

export default app;