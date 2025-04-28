import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchResults = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/jobs/search?query=${query}`
        );
        const data = await response.json();
        if (data.success) {
          setJobs(data.jobs);
        } else {
          setError("No jobs found.");
        }
      } catch (error) {
        setError("Error fetching jobs.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchJobs();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>{job.title}</li>
          ))}
        </ul>
      ) : (
        <p>No jobs found for this search.</p>
      )}
    </div>
  );
};

export default SearchResults;

// https://job-portal-877n.onrender.com
