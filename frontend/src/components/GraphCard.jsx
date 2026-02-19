import GraphView from "./GraphView";

export default function GraphCard({ data }) {
  if (!data) return null;

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg
                    p-5 sm:p-6 lg:p-8">
      
      <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-1 sm:mb-2 tracking-wide">
        Transaction Network Graph
      </h2>

      <p className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-6">
        Red nodes indicate suspicious accounts
      </p>

      {/* Graph container */}
      <div
        className="rounded-xl overflow-hidden border border-white/5
                   h-[300px] sm:h-[380px] lg:h-[420px]"
      >
        <GraphView data={data} />
      </div>
    </div>
  );
}
