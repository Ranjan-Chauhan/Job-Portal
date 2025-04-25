import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    location: {
      type: String,
      required: true,
      index: true,
    },

    salaryRange: { type: String },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "remote"],
      default: "full-time",
    },

    skillRequired: {
      type: [String],
      default: [],
    },

    experienceRequired: {
      type: String,
      default: "fresher",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postedDate: {
      postedDate: {
        type: Date,
        default: Date.now,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        resume: { type: String },
        appliedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
