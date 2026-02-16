import React from "react";
import { useState } from "react";

const Signup = () => {
  const apiUrl=import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
        const response= await fetch (`${apiUrl}/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        });
        const data= await response.json();

        if(!response.ok){
            throw new Error(data.message); 
        }

        console.log("User created",data);
    }
    catch(e){
        setError(e.message)
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
        />
        <input
            type="text"
            name="email"
            placeholder="email"
            onChange={handleChange}
        />
        <input
            type="text"
            name="password"
            autoComplete="new-password"
            placeholder="password"
            onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
