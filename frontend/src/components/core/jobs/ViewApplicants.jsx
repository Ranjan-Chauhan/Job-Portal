// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { FiArrowLeft, FiDownload } from "react-icons/fi";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const ViewApplicants = () => {
//   const { jobId } = useParams();
//   const navigate = useNavigate();
//   const [applicants, setApplicants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch applicants for a job
//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/api/v1/applications/job/${jobId}/applicants`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         const data = await response.json();

//         if (data.success) {
//           setApplicants(data.applicants || []);
//           console.log("applicants :", data);
//         } else {
//           setError(data.message || "Failed to fetch applicants");
//         }
//       } catch (error) {
//         setError("An error occurred while fetching applicants");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplicants();
//   }, [jobId]);

//   const handleBack = () => {
//     navigate("/dashboard");
//   };

//   if (loading) {
//     return <p>Loading applicants...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">{error}</p>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* Back Arrow */}
//       <button
//         onClick={handleBack}
//         className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <FiArrowLeft className="mr-2" />
//         Back to Dashboard
//       </button>

//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Applicants for Job #{jobId}
//       </h2>

//       {applicants.length === 0 ? (
//         <p className="text-gray-600">No applicants yet for this job.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-lg shadow">
//           <table className="w-full min-w-[500px] text-sm text-left text-gray-700">
//             <thead className="bg-gray-100 text-gray-800 text-sm uppercase">
//               <tr>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Email</th>
//                 <th className="px-4 py-3">Contact Number</th>
//                 <th className="px-4 py-3">Resume</th>
//                 <th className="px-4 py-3">Applied On</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applicants.map((applicant) => (
//                 <tr
//                   key={applicant._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="px-4 py-3 font-medium">
//                     {applicant.applicantId.firstName}{" "}
//                     {applicant.applicantId.lastName}
//                   </td>
//                   <td className="px-4 py-3">{applicant.applicantId.email}</td>
//                   <td className="px-4 py-3">
//                     {applicant.applicantId.contactNumber}
//                   </td>
//                   <td className="px-4 py-3">
//                     <a
//                       href={applicant.applicantId.resume}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center text-blue-600 hover:text-blue-800"
//                     >
//                       <FiDownload className="mr-1" /> Resume
//                     </a>
//                   </td>
//                   <td className="px-4 py-3">{applicant.appliedAt}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewApplicants;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ViewApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

        if (response.status === 401) {
          // If token expired or invalid, logout and redirect to login
          logoutAndRedirect();
          return;
        }

        if (data.success) {
          setApplicants(data.applications || []); // Use data.applications
          console.log("applicants :", data);
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
    navigate("/manage-jobs");
  };

  const handleDownload = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        logoutAndRedirect();
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/applications/download/${applicationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        logoutAndRedirect();
        return;
      }

      if (response.ok) {
        // If the response is ok, trigger file download
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "resume.pdf"; // You can adjust the filename here
        link.click();
      } else {
        console.error("Download failed: ", response.statusText);
        alert("Failed to download the resume.");
      }
    } catch (error) {
      console.error("Error downloading resume: ", error);
      alert("Something went wrong while downloading the resume.");
    }
  };

  const logoutAndRedirect = () => {
    alert("Session expired. Please login again.");

    dispatch(logout()); // <-- Clear Redux auth state
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
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
        Back
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
                <th className="px-4 py-3">Contact Number</th>
                <th className="px-4 py-3">Resume</th>
                <th className="px-4 py-3">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((application) => (
                <tr
                  key={application._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {application.applicantId.firstName}{" "}
                    {application.applicantId.lastName}
                  </td>
                  <td className="px-4 py-3">{application.applicantId.email}</td>
                  <td className="px-4 py-3">
                    {application.applicantId.contactNumber}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDownload(application._id)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FiDownload className="mr-1" /> Resume
                    </button>
                  </td>
                  <td className="px-4 py-3">{application.appliedAt}</td>
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
