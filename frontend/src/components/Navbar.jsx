export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          py-3 sm:py-4
          flex flex-col sm:flex-row
          gap-3 sm:gap-0
          sm:items-center sm:justify-between
        "
      >
        {/* Left section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-red-600 to-yellow-500 flex items-center justify-center text-black font-extrabold shadow-lg">
            FF
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-semibold text-white tracking-wide">
              Financial Forensics Engine
            </h1>
            <p className="text-[11px] sm:text-xs text-white/60 leading-tight">
              Money Muling & Fraud Ring Detection
            </p>
          </div>
        </div>

        {/* Right badge */}
        <span
          className="
            self-start sm:self-auto
            text-[11px] sm:text-xs
            font-semibold
            bg-white/10 text-yellow-400
            px-3 sm:px-4 py-1.5
            rounded-full border border-white/10 backdrop-blur-md
          "
        >
          🚀 RIFT Hackathon 2026
        </span>
      </div>
    </div>
  );
}
