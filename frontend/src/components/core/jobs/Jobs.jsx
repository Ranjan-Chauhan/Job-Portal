import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // page number state
  const [limit, setLimit] = useState(6); // limit per page
  const [totalPages, setTotalPages] = useState(1); // total pages

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/jobs?page=${page}&limit=${limit}`
        );
        const data = await response.json();
        console.log("data: ", data);

        if (data.success) {
          setJobs(data.jobs);
          setTotalPages(data.total / limit);
        } else {
          setError(data.message || "Failed to load jobs");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Something went wrong while fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, limit]);

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  const handleViewJob = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Available Jobs
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {job.jobTitle}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {job.company || "Company Name"}
                </p>
                <p className="text-gray-500 text-sm mb-1">📍 {job.location}</p>
                <p className="text-gray-500 text-sm mb-1">💼 {job.jobType}</p>
                <p className="text-gray-500 text-sm mb-3">
                  💰 {job.salaryRange}
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  🕓 Posted {new Date(job.createdAt).toLocaleDateString()}
                </p>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApply(job._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleViewJob(job._id)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
