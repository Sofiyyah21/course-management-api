import Course from "../models/Course.js";

export const enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        // if not find
        if (!course) {
            return res.status(404).json({
              message: "course not found",
            });
        };

        // only student can enroll
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Students only" });
        };

        //protect duplicate enrollment
        if (course.enrolledstudents.includes(req.user._id)) {
            return res.status(400).json({
              message: "Enrolled already",
            });
        }

        course.enrolledstudents.push(req.user._id);
        await course.save();

        res.status(201).json({
            message: "Enrolled successfully", course
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// get courses enrolled by student
export const getMyCourses = async(req, res) => {
    try {
        const courses = await Course.find({enrolledstudents: req.user._id,});

        res.json(courses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    };
};