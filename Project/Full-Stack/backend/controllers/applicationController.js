import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
  const user = req.user;

  if (user.role !== "job-seeker") {
    return res
      .status(403)
      .json({ message: "Only job seekers can apply to jobs" });
  }

  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const application = new Application({
      job: job._id,
      applicant: user._id,
    });

    await application.save();
    res.status(201).json({ message: "Applied successfully", application });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "You already applied to this job" });
    } else {
      res
        .status(500)
        .json({ message: "Failed to apply", error: error.message });
    }
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job");
    res.status(200).json(applications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch applications", error: error.message });
  }
};
