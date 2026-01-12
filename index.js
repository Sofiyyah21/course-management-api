import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import loginRoute from "./routes/loginRoute.js";
import signupRoute from "./routes/signupRoute.js";
import testRoutes from "./routes/testRoute.js";
import courseRoute from "./routes/courseRoute.js";
import enrollmentRoute from "./routes/enrollmentRoute.js";

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
app.use("/api/test", testRoutes);
app.use("/api/course", courseRoute);
app.use("/", enrollmentRoute)

// Test route
app.get("/", (req, res) => {
    res.send("Course Management API is running ");
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});