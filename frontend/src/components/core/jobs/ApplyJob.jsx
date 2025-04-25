import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    resume: null,
    coverLetter: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData to handle file upload
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("jobId", id);
    formDataToSubmit.append("resume", formData.resume);
    formDataToSubmit.append("coverLetter", formData.coverLetter);

    try {
      const token = localStorage.getItem("token");
      // Call the API to submit the application
      const response = await fetch(
        `https://job-portal-877n.onrender.com/api/v1/applications/apply/${id}`,
        {
          method: "POST",
          headers: {
            // Include the token if required for authentication
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSubmit,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Application submitted successfully!");
        navigate("/jobs");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting your application.");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
        Apply for Job #{id}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-xl space-y-5"
        encType="multipart/form-data"
      >
        {/* Resume Upload */}
        <div className="sm:w-4/5">
          <label className="block text-sm font-medium mb-1">Resume (PDF)</label>
          <div className="flex items-center gap-3 border px-3 py-2 rounded-md bg-gray-50">
            <IoCloudUploadOutline className="text-2xl text-gray-500" />
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium mb-1">Cover Letter</label>
          <textarea
            name="coverLetter"
            rows={4}
            placeholder="Write a short cover letter..."
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full sm:w-4/5 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-4/5 bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
