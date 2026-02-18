import { Pencil, Trash2 } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

const statusStyles = {
  applied: "bg-blue-500/20 text-blue-400",
  interview: "bg-yellow-500/20 text-yellow-400",
  offer: "bg-emerald-500/20 text-emerald-400",
  rejected: "bg-red-500/20 text-red-400",
};

const JobCard = ({ job }) => {
  const { openEditModal, deleteJob } = useDashboard();

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center justify-between hover:border-slate-500 transition">
      
      {/* Left Side */}
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-white">
          {job.title}
        </h3>
        <p className="text-xs text-slate-400">
          {job.company}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Status Badge */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusStyles[job.status] || "bg-slate-600 text-slate-300"
          }`}
        >
          {job.status}
        </span>

        {/* Edit Button */}
        <button
          onClick={() => openEditModal(job)}
          className="text-slate-400 hover:text-blue-400 transition"
        >
          <Pencil size={16} />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => deleteJob(job._id)}
          className="text-slate-400 hover:text-red-400 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
