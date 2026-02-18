import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Ensure your env variables are loaded

const app = express();

// Configure CORS with options
app.use(cors({
    // Provide your frontend URL here (e.g., http://localhost:5173 or your Vercel URL)
    origin: process.env.FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Allow cookies/headers if needed
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

export default app;
