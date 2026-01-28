import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

// 1. Load req configuration
dotenv.config();

// 2. Connect DB
connectDB();

const app = express();