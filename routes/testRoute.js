import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Only logged-in users
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "User profile accessed",
    user: req.user,
  });
});

// Only admin
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({ message: "Admin route accessed" });
  }
);

export default router;
