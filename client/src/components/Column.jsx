import { useDroppable } from "@dnd-kit/core";
import JobCard from "./JobCard";

const Column = ({ title, status, jobs }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        relative
        bg-slate-800/50
        p-4
        rounded-xl
        border
        h-[65vh]
        flex
        flex-col
        transition-all
        duration-300
        ease-out
        transform
        overflow-x-hidden
        no-scrollbar
        ${
          isOver
            ? "border-blue-500 bg-slate-800 shadow-2xl scale-[1.03]"
            : "border-slate-700"
        }
      `}
    >
      {/* Magnetic Glow Overlay */}
      {isOver && (
        <div className="absolute inset-0 rounded-xl border-2 border-blue-400 animate-pulse pointer-events-none" />
      )}

      <h2 className="text-lg font-semibold mb-4">
        {title}
        <span className="ml-2 text-sm text-slate-400">
          ({jobs.length})
        </span>
      </h2>

      {/* This wrapper keeps empty column droppable */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 min-h-[50px]">
        {jobs.length === 0 ? (
          <div
            className={`
              h-full flex items-center justify-center text-sm transition-all duration-300
              ${
                isOver
                  ? "text-blue-400 font-medium"
                  : "text-slate-500"
              }
            `}
          >
            {isOver ? "Release to drop" : "Drop here"}
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;