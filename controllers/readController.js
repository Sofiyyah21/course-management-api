import Course from "../models/Course.js";

// get all course
export const getCourses = async(req, res) => {
    try {
        const courses = await Course.find().populate("instrictor", "name email");

        res.json(courses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    };
};

// get single course
export const getCourseById = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("instrictor", "name email");
        if (!course){
            return res.status(404).json({
                message: "Course not found"
            });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    };
};
