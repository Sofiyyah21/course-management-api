import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import loginRoute from "./routes/loginRoute.js";
import signupRoute from "./routes/signupRoute.js";
import testRoutes from "./routes/testRoute.js";
import courseRoute from "./routes/courseRoute.js";
import multer from "multer";

dotenv.config();

const app = express();

// Connect to database
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route
app.use("/", loginRoute);
app.use("/", signupRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/test", testRoutes);
app.use("/api/course", courseRoute);

// Multer error handler
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.static(400).json({
            message: error.message,
        })
    }

    res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
    })
})
// Test route
app.get("/", (req, res) => {
    res.send("Course Management API is running ");
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});