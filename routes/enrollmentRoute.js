import express from "express";
import { enrollInCourse } from "../controllers/enrollmentController.js";
import { getMyCourses } from "../controllers/enrollmentController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

// enrolled course (student only)
router.post("/:courseId", protect, authorizeRoles("student"), enrollInCourse);

// get enrolled courses
router.get("/myCourses", protect, authorizeRoles("student"), getMyCourses);

export default router;