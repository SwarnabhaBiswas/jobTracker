import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { user } = useContext(AuthContext);
  const [jobs, setjobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`, //sends token saved by login
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        
        setjobs(data.jobs); //since data is an object and jobs is an array and we do .map on arrays

      } catch (e) {
        setError(e.message);
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
