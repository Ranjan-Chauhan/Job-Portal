import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiDownload } from "react-icons/fi";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ViewApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applicants for a job
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/applications/job/${jobId}/applicants`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setApplicants(data.applicants || []);
        } else {
          setError(data.message || "Failed to fetch applicants");
        }
      } catch (error) {
        setError("An error occurred while fetching applicants");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <p>Loading applicants...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back Arrow */}
      <button
        onClick={handleBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Applicants for Job #{jobId}
      </h2>

      {applicants.length === 0 ? (
        <p className="text-gray-600">No applicants yet for this job.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full min-w-[500px] text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Resume</th>
                <th className="px-4 py-3">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {applicant.applicantId.fullName}
                  </td>
                  <td className="px-4 py-3">{applicant.applicantId.email}</td>
                  <td className="px-4 py-3">
                    <a
                      href={applicant.applicantId.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FiDownload className="mr-1" /> Resume
                    </a>
                  </td>
                  <td className="px-4 py-3">{applicant.appliedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;
