export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 to-yellow-500 flex items-center justify-center text-black font-extrabold shadow-lg">
            FF
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white tracking-wide">
              Financial Forensics Engine
            </h1>
            <p className="text-xs text-white/60">
              Money Muling & Fraud Ring Detection
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold bg-white/10 text-yellow-400 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          🚀 RIFT Hackathon 2026
        </span>
      </div>
    </div>
  );
}
