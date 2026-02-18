import JobCard from "./JobCard";

const Column = ({ title, jobs }) => {
  return (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 h-[65vh] flex flex-col">

      {/* Header (fixed) */}
      <h2 className="text-lg font-semibold mb-4 text-white">
        {title}
        <span className="ml-2 text-sm text-slate-400">
          ({jobs.length})
        </span>
      </h2>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">

        {jobs.length === 0 ? (
          <p className="text-slate-400 text-sm">No jobs</p>
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