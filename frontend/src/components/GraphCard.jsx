import GraphView from "./GraphView";

export default function GraphCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Transaction Network Graph
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Red nodes indicate suspicious accounts
      </p>

      <GraphView data={data} />
    </div>
  );
}
