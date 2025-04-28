import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/core/user/SignUp";
import Login from "./components/core/user/Login";
import Navbar from "./components/common/Navbar";
import Home from "./components/common/Home";
import Jobs from "./components/core/jobs/Jobs";
import Dashboard from "./components/core/user/Dashboard";
import ApplyForJob from "./components/core/jobs/ApplyForJob";
import JobDetails from "./components/core/jobs/JobDetails";
import Profile from "./components/core/user/Profile";
import ManageJobs from "./components/core/jobs/ManageJobs";
import ViewApplicants from "./components/core/jobs/ViewApplicants";
import CreateJob from "./components/core/jobs/CreateJob";
import UpdateJob from "./components/core/jobs/UpdateJob";
import AppliedJobs from "./components/core/user/AppliedJobs";
import Unauthorized from "./components/common/Unauthorized";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleProtectedRoute from "./components/common/RoleProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* Protected Routes (Login Required) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apply/:id" element={<ApplyForJob />} />
        </Route>

        {/* Employer-specific routes */}
        <Route element={<RoleProtectedRoute requiredRole="employer" />}>
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/add-job" element={<CreateJob />} />
          <Route path="/update-job/:jobId" element={<UpdateJob />} />
          <Route path="/job/:jobId/applicants" element={<ViewApplicants />} />
        </Route>

        {/* Job Seeker-specific routes */}
        <Route element={<RoleProtectedRoute requiredRole="jobSeeker" />}>
          <Route path="/applied-jobs" element={<AppliedJobs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
