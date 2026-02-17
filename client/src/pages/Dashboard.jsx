import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import api from "../api/axios";

const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { user } = useContext(AuthContext);
  const [jobs, setjobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setjobs(response.data.jobs); //since data is an object and jobs is an array and we do .map on arrays

      } catch (e) {
        setError(e.response?.data?.message);
      }
    };
    fetchJobs(); //calls itself
  }, []);

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      {error && <p>{error}</p>}

      {jobs.length === 0 ? <p>No jobs to show</p> : 
      <ul>
        {jobs.map((job)=>(
          <li key={job.id}>
            {job.title} - {job.company}
          </li>
        ))}
      </ul>
      }
    </div>
  );
};

export default Dashboard;
