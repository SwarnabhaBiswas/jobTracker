import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("User created", data);

      // 3. Update the global Auth state with the new user/token
      login(data);

      // 4. Redirect the user to the dashboard
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* LEFT SECTION: Form (Swapped to Left) */}
      <div className="w-full md:w-[55%] flex items-center justify-center p-8 md:p-24 order-2 md:order-1">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-900">JobTracker</h2>

          <div className="mt-16 mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mt-[-20px] mb-4">
              Create Account
            </h3>
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-slate-900 font-semibold underline underline-offset-4"
              >
                Login here
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-3 border-b-2 border-slate-200 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 border-b-2 border-slate-200 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="relative group">
              <input
                type="password"
                name="password"
                required
                autoComplete="new-password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 border-b-2 border-slate-200 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-md hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SECTION: Brand/Marketing (Swapped to Right) */}
      <div className="w-full md:w-[45%] bg-gradient-to-br from-slate-900 to-slate-700 p-12 flex flex-col justify-between text-white relative overflow-hidden order-1 md:order-2">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-[-5%] right-[-5%] w-64 h-64 border-2 border-white rounded-full"></div>
        </div>

        <div>
          <div className="mb-20">
            <Sparkles className="w-12 h-12 mb-6" />
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Join Us <br /> Today!
            </h1>
            <p className="text-indigo-100 text-lg max-w-sm leading-relaxed">
              Start your journey with JobTracker. Set up your profile in seconds
              and begin tracking your career growth!
            </p>
          </div>
        </div>

        <div className="text-sm text-indigo-200">
          © 2026 JobTracker. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Signup;
