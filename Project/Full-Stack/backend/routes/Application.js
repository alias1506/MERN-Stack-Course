import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyApplications } from "../controllers/applicationController.js"; // Import getMyApplications from "../controllers/applicationController.js";

const router = express.Router();

router.post("/my-applications", protect, getMyApplications);

export default router;