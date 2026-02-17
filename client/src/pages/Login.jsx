import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import api from "../api/axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //login now uses axios no manual headers, no manual stringify and login data handled by context
      const response = await api.post("/auth/login", formData);
      login(response.data);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
