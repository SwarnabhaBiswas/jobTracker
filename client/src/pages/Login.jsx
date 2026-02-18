import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import api from "../api/axios";
import { Sparkles } from "lucide-react"; // npm install lucide-react

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await api.post("/auth/login", formData);
      login(response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* LEFT SECTION: Brand/Marketing */}
      <div className="w-full md:w-[45%] bg-gradient-to-br from-slate-900 to-slate-700 p-12 flex flex-col justify-between text-white relative overflow-hidden">
        {/* Subtle Background Decorative Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 border-2 border-white rounded-full"></div>
        </div>

        <div>
          <div className="mb-20">
            <Sparkles className="w-12 h-12 mb-6" />
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Hello Peeps : )
            </h1>
            <p className="text-indigo-100 text-lg max-w-sm leading-relaxed">
              Simplify your job tracking and stay organized. Get highly productive through tracking and land your dream job faster!
            </p>
          </div>
        </div>

        <div className="text-sm text-indigo-200">
          © 2026 JobTracker. All rights reserved.
        </div>
      </div>

      {/* RIGHT SECTION: Form */}
      <div className="w-full md:w-[55%] flex items-center justify-center p-8 md:p-24">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-900">JobTracker</h2>
          <div className="mt-16 mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mt-[-20px] mb-4">Welcome Back!</h3>
            <p className="text-slate-500 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-slate-900 font-semibold underline underline-offset-4">
                Create a new account now
              </Link>
              , It's FREE!
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
                type="email"
                name="email"
                required
                autoComplete="email"
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
                autoComplete="current-password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 border-b-2 border-slate-200 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-md hover:bg-slate-800 transition-all active:scale-[0.98] disabled:bg-slate-400"
            >
              {isSubmitting ? "Signing in..." : "Login Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
