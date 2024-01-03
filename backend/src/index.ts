import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routers/users'
import authRoutes from './routers/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_SRTING as string);


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URLS,
    methods: ['GET', 'POST']
}))

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log("Hello world from the server, localhost:3000");
})
