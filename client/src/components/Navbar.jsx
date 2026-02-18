import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Briefcase } from "lucide-react";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Generates a consistent "random" color for the user
  const avatarColor = useMemo(() => {
    const colors = [
      "bg-blue-500", "bg-emerald-500", "bg-purple-500", 
      "bg-amber-500", "bg-pink-500", "bg-indigo-500", "bg-cyan-500"
    ];
    if (!user?.name) return colors[0];
    const charCodeSum = user.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  }, [user?.name]);

  const initial = user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 border rounded-xl mb-5">
      {/* Logo Section */}
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={() => navigate("/dashboard")}
      >
        <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
          <Briefcase className="text-slate-900 w-6 h-6" />
        </div>
        <span className="text-3xl font-bold text-white tracking-tight">
          Job<span className="text-blue-600">Tracker</span>
        </span>
      </div>

      {/* Profile Section */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-slate-400 text-sm font-medium">
            {user.name}
          </span>
          <button
            onClick={() => navigate("/profile")}
            className={`w-10 h-10 ${avatarColor} rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-700 hover:border-white transition-all shadow-lg`}
          >
            {initial}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
