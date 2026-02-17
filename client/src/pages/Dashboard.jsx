import JobModal from "../components/JobModal";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";

const DashboardContent = () => {
  const { jobs, loading, openCreateModal, openEditModal, deleteJob } =
    useDashboard();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide">Dashboard</h1>

        <button
          onClick={openCreateModal}
          className="bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg font-medium transition"
        >
          + Add Job
        </button>
      </div>

      {loading && (
        <p className="text-slate-400 animate-pulse">Loading...</p>
      )}

      {/* Job List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex justify-between items-center hover:border-slate-500 transition"
          >
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {job.company} • {job.status}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => openEditModal(job)}
                className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded-md text-sm transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-500 hover:bg-red-400 px-3 py-1 rounded-md text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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
