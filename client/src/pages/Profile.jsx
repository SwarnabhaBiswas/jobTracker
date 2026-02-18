import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Added useNavigate
import { AuthContext } from "../context/authContext";
import { LogOut, Mail, User, ShieldCheck, ArrowLeft } from "lucide-react"; // Added ArrowLeft

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate

  const avatarColor = useMemo(() => {
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-purple-500",
      "bg-amber-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-cyan-500",
    ];
    if (!user?.name) return "bg-slate-500";
    const charCodeSum = user.name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  }, [user?.name]);

  if (!user) return null;

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="min-h-[100vh] bg-slate-900 flex items-center justify-center p-4 relative">
      {/* BACK BUTTON: Top Left of the screen/container */}
      <button
        onClick={() => navigate("/dashboard")} // Or use navigate(-1) to go back
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
      >
        <div className="p-2 rounded-full bg-slate-800/30 border border-slate-700 group-hover:border-slate-500">
          <ArrowLeft size={20} />
        </div>
        <span className="font-medium">Back</span>
      </button>

      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden mt-10">
        {/* Banner */}
        <div className={`h-32 ${avatarColor} opacity-70`} />

        <div className="px-8 pb-8">
          <div className="relative flex justify-center">
            {/* Avatar */}
            <div
              className={`-mt-16 w-32 h-32 rounded-full ${avatarColor} border-8 border-slate-800 flex items-center justify-center text-5xl font-black text-white shadow-2xl`}
            >
              {initial}
            </div>
          </div>

          <div className="text-center mt-4">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {user.name}
            </h1>
            <div className="inline-flex items-center gap-1 mt-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> Active Session
            </div>
          </div>

          {/* Info Details */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-4 p-4 bg-slate-900/40 rounded-2xl border border-slate-700/50">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black">
                  Full Name
                </p>
                <p className="text-slate-200 font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-900/40 rounded-2xl border border-slate-700/50">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black">
                  Email Address
                </p>
                <p className="text-slate-200 font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={() => {
              logout(); // 1. Clears localStorage & State
              navigate("/"); // 2. Redirects to Login page
            }}
            className="mt-8 w-full flex items-center justify-center gap-3 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl border border-red-500/20 transition-all font-bold group"
          >
            <LogOut
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
