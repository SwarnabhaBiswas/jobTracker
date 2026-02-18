import {
  DndContext,
  closestCorners,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState, useContext } from "react";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import { AuthContext } from "../context/authContext";
import Column from "../components/Column";
import JobCard from "../components/JobCard";
import JobModal from "../components/JobModal";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const statuses = ["applied", "interview", "offer", "rejected"];

const DashboardContent = () => {
  const { jobs, loading, openCreateModal, updateJobStatus } = useDashboard();
  const { user } = useContext(AuthContext);

  const [activeJob, setActiveJob] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // prevent accidental drag
    })
  );

  const getJobsByStatus = (status) =>
    jobs.filter((job) => job.status === status);

  const handleDragStart = (event) => {
    const job = jobs.find((j) => j._id === event.active.id);
    setActiveJob(job);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const activeId = active.id;
    const newStatus = over.id; // column id

    const draggedJob = jobs.find((j) => j._id === activeId);

    if (!draggedJob) return;

    if (draggedJob.status === newStatus) return;

    updateJobStatus(activeId, {
      ...draggedJob,
      status: newStatus,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {loading && <Loader />}
      <Navbar />

      <div className="flex justify-between items-center mb-8">
        <p className="text-3xl font-bold">
          Welcome back,{" "}
          <span className="capitalize text-4xl">{user.name}</span>
        </p>

        <button
          onClick={openCreateModal}
          disabled={loading}
          className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          + Add Job
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        autoScroll
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              title={status.charAt(0).toUpperCase() + status.slice(1)}
              jobs={getJobsByStatus(status)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeJob ? (
            <div className="rotate-2 opacity-90">
              <JobCard job={activeJob} overlay />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <JobModal />
    </div>
  );
};

const Dashboard = () => (
  <DashboardProvider>
    <DashboardContent />
  </DashboardProvider>
);

export default Dashboard;