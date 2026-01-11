import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User signup successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
