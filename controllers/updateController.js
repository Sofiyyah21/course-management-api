import Course from "../models/Course.js";

export const updateCourse = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course){
            return res.status(404).json({
                message: "Course not found"
            });
        };

        // only instructor or admin can create
        if (
            course.instructor.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }
        
        course.title = req.body.title || course.title;
        course.description = req.body.description || course.description;
        course.price = req.body.price || course.price;
    
        await course.save();
        res.json({
            message: "Course updated successfully",
            course
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    };
};