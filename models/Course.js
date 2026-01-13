import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        price: {
            type: Number,
            default: 0,
        },
        enrolledstudents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
    ],
        image: {
            type: String,
        },
    },
    {timestamps: true}
);

export default mongoose.model("course", courseSchema);