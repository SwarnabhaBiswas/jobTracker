import JobModal from "../components/JobModal";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import JobCard from "../components/JobCard";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Column from "../components/Column";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const DashboardContent = () => {
  const { jobs, loading, openCreateModal } = useDashboard();
  const { user } = useContext(AuthContext);

  const appliedJobs = jobs.filter((job) => job.status === "applied");
  const interviewJobs = jobs.filter((job) => job.status === "interview");
  const offerJobs = jobs.filter((job) => job.status === "offer");
  const rejectedJobs = jobs.filter((job) => job.status === "rejected");
  
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
    {loading && <Loader />}
      {/* Header */}
      <Navbar/>
      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-bold tracking-wide">
          Welcome back,{" "}
          <span className="text-4xl font-bold tracking-wide capitalize">
            {user.name}
          </span>
        </p>

        <button
          onClick={openCreateModal}
          className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
        >
          + Add Job
        </button>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Column title="Applied" jobs={appliedJobs} />
        <Column title="Interview" jobs={interviewJobs} />
        <Column title="Offer" jobs={offerJobs} />
        <Column title="Rejected" jobs={rejectedJobs} />
      </div>

      <JobModal />
    </div>
  );
};

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;
