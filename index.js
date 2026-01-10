import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js'

dotenv.config();

const app = express();

// Connect to database
connectDB();

//middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Course Management API is running ");
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});