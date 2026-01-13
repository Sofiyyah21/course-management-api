import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
    try {
        const { title, description, instructor, price } = req.body;

        // create course
        const course = await Course.create({
            title,
            description,
            instructor: req.user._id,
            price,
            image: req.file ? req.file.filename : null,
        });

        res.status(201).json({
            message: "Course created successful", course
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
