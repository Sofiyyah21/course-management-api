import Course from "../models/Course.js";

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
  
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
  
        // Only admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin only access" });
        }
  
        await course.deleteOne();
  
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};