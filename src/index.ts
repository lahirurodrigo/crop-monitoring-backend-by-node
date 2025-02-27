import express from "express";
import cors from "cors"; // Importing cors
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

// Use CORS middleware
app.use(cors());  // Apply CORS globally to your app

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
