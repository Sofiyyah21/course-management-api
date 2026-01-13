import express from "express";
import { createCourse } from "../controllers/createController.js";
import { getCourses } from "../controllers/readController.js";
import { getCourseById } from "../controllers/readController.js";
import { updateCourse } from "../controllers/updateController.js";
import { deleteCourse } from "../controllers/deleteController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();
// create course ( admin & instructor only)
router.post(
    "/create", 
    protect, 
    authorizeRoles("admin", "instructor"), 
    upload.single("image"),
    createCourse);

// get all courses
router.get("/courses", getCourses);

// get single course
router.get("/:id", getCourseById);

//update course
router.put("/:id", protect, updateCourse);

//delete course
router.delete("/:id", protect, authorizeRoles("admin"), deleteCourse);

export default router;