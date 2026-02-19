export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            FF
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Financial Forensics Engine
            </h1>
            <p className="text-xs text-gray-500">
              Money Muling & Fraud Ring Detection
            </p>
          </div>
        </div>

        <span className="text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full">
          🚀 RIFT Hackathon 2026
        </span>
      </div>
    </div>
  );
}
