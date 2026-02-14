import dotenv from "dotenv";
dotenv.config(); //Reads variables from .env file and loads them into process.env

import connectDB from "./config/db.js";
connectDB(); //connects database

import app from "./app.js";
import express from 'express';
//route files import
import authRoutes from './routes/auth.routes.js';

const PORT= process.env.PORT || 5000;
app.use(express.json());

//routes to be sent to
app.use("/api/auth", authRoutes);


app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})