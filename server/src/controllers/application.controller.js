import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";

export const applyForJob = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const resume = req.file;
    const jobId = req.params.id;
    const applicantId = req.user._id;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({ jobId, applicantId });
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ success: false, message: "Already applied to this job" });
    }

    // Make sure resume is provided (you can check file type or size too)
    if (!resume) {
      return res
        .status(400)
        .json({ success: false, message: "Resume is required" });
    }

    const application = await Application.create({
      jobId,
      applicantId,
      resume: "", // resume url
      coverLetter,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller for getting all applications of an applicant
export const getMyApplications = async (req, res) => {
  try {
    const applicantId = req.user._id;

    const applications = await Application.find({ applicantId })
      .populate("jobId", "jobTitle companyName location") // Populate job details
      .sort({ createdAt: -1 }) // Sort by the most recent application
      .lean();

    // console.log("applied application: ", applications);

    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Fetch Applications Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get applicants for a specific job (Employer view)

export const getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicants = await Application.find({ jobId })
      .populate("applicantId", "fullName email phone resume") // Add resume field here
      .sort({ createdAt: -1 })
      .lean();

    // Format the appliedAt date
    applicants.forEach((applicant) => {
      applicant.appliedAt = new Date(applicant.createdAt).toLocaleDateString(); // Format the appliedAt date
    });

    res.status(200).json({ success: true, applicants });
  } catch (error) {
    console.error("Fetch Applicants Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc   Update application status (Admin/Employer action)
// @route  PATCH /api/applications/:id/status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, updated });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
