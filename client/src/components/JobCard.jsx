import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2 } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

const statusStyles = {
  applied: "bg-blue-500/20 text-blue-400",
  interview: "bg-yellow-500/20 text-yellow-400",
  offer: "bg-emerald-500/20 text-emerald-400",
  rejected: "bg-red-500/20 text-red-400",
};

const JobCard = ({ job, overlay }) => {
  const { openEditModal, deleteJob } = useDashboard();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job._id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!overlay ? listeners : {})}
      {...attributes}
      className={`bg-slate-800 border rounded-lg px-4 py-3 flex items-center justify-between
        cursor-grab transition
        ${overlay ? "shadow-2xl scale-105" : "border-slate-700 hover:border-slate-500"}
      `}
    >
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold">{job.title}</h3>
        <p className="text-xs text-slate-400">{job.company}</p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusStyles[job.status]
          }`}
        >
          {job.status}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openEditModal(job);
          }}
          className="text-slate-400 hover:text-blue-400"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteJob(job._id);
          }}
          className="text-slate-400 hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;