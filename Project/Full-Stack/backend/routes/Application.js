import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  applyToJob,
  getMyApplications,
} from "../controllers/applicationController.js"; // Import getMyApplications from "../controllers/applicationController.js";

const router = express.Router();

router.get("/my-applications", protect, getMyApplications);
router.post("/:jobId", protect, applyToJob);

export default router;
