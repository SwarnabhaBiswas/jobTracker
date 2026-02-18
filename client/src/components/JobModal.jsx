import { useDashboard } from "../context/DashboardContext";
import { useState, useEffect } from "react";

const JobModal = () => {
  const { isModalOpen, closeModal, selectedJob, saveJob, loading } =
    useDashboard();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    status: "applied",
  });

  useEffect(() => {
    if (selectedJob) {
      // Fill form for Edit Mode
      setFormData({
        title: selectedJob.title || "",
        company: selectedJob.company || "",
        status: selectedJob.status || "applied",
      });
    } else {
      // FORCE CLEAR for Create Mode
      setFormData({
        title: "",
        company: "",
        status: "applied",
      });
    }
  }, [selectedJob, isModalOpen]); // Add isModalOpen here to trigger reset on open/close

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveJob(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6">
          {selectedJob ? "Edit Job" : "Create Job"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-slate-700 border border-slate-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-md transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md transition ${
                loading
                  ? "bg-slate-500 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-600"
              }`}
            >
              {loading ? "Processing..." : selectedJob ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
