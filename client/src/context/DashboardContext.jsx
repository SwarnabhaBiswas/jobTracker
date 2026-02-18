import { useEffect, useState, createContext, useContext } from "react";
import api from "../api/axios";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // FETCH JOBS (Keeps the backend's sorted order)
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/jobs");
      setJobs(response.data.jobs);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openCreateModal = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // CLEANUP FUNCTION: Resets both Visibility and State
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const saveJob = async (formData) => {
    if (loading) return; // Double security: stop function if already loading

    try {
      setLoading(true);
      if (selectedJob) {
        const res = await api.put(`/jobs/${selectedJob._id}`, formData);
        setJobs((prev) =>
          prev.map((j) => (j._id === selectedJob._id ? res.data : j)),
        );
      } else {
        await api.post(`/jobs`, formData);
        await fetchJobs(); // Refresh sorted list
      }

      closeModal(); // 👈 This MUST run to reset selectedJob to null
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (id, updatedData) => {
  try {
    const res = await api.put(`/jobs/${id}`, updatedData);

    setJobs((prev) =>
      prev.map((j) => (j._id === id ? res.data : j))
    );
  } catch (e) {
    console.error(e.message);
  }
};

  const deleteJob = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        jobs,
        setJobs,
        loading,
        isModalOpen,
        selectedJob,
        openCreateModal,
        openEditModal,
        closeModal,
        saveJob,
        updateJobStatus,
        deleteJob,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
