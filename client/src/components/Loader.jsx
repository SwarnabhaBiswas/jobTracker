import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white/5 backdrop-blur-[1px] z-[9999] flex flex-col items-center justify-center pointer-events-none">
      
      <div className="flex flex-col items-center bg-white/80 p-4 rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
        <Loader2 className="w-10 h-10 text-blue-700 animate-spin" />
        <p className="mt-2 text-slate-500 font-medium text-xs uppercase tracking-tighter">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
