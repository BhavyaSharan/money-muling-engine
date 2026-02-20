import CytoscapeComponent from "react-cytoscapejs";
import { useMemo, useState } from "react";
import AccountExplanation from "./AccountExplanation";

export default function GraphView({ data }) {
  const [selectedNode, setSelectedNode] = useState(null);

  if (!data) return null;

  const suspiciousSet = new Set(
    data.suspicious_accounts.map((a) => a.account_id)
  );

  const ringColorMap = {};
  const ringColors = [
    "#facc15",
    "#22c55e",
    "#a855f7",
    "#f97316",
    "#06b6d4",
  ];

  data.fraud_rings.forEach((ring, index) => {
    ringColorMap[ring.ring_id] =
      ringColors[index % ringColors.length];
  });

  const elements = useMemo(() => {
    const nodes = new Map();

    // 🔹 Build nodes
    data.graph_edges.forEach(({ source, target }) => {
      nodes.set(source, true);
      nodes.set(target, true);
    });

    const nodeElements = Array.from(nodes.keys()).map((id) => {
      const account = data.suspicious_accounts.find(
        (a) => a.account_id === id
      );

      return {
        data: {
          id,
          label: id,
          suspicious: suspiciousSet.has(id),
          ringColor: account ? ringColorMap[account.ring_id] : null,
        },
      };
    });

    // 🔹 Build edges
    const edgeElements = data.graph_edges.map((e, index) => ({
      data: {
        id: `${e.source}-${e.target}-${index}`,
        source: e.source,
        target: e.target,
      },
    }));

    return [...nodeElements, ...edgeElements];
  }, [data]);

  return (
    <div className="w-full h-full relative">
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "100%" }}
        layout={{
  name: "grid",
  fit: true,
}}
        stylesheet={[
          {
            selector: "node",
            style: {
              label: "data(id)",
              "background-color": "#3b82f6",
              color: "#fff",
              "font-size": 8,
              width: 20,
              height: 20,
            },
          },
          {
            selector: "node[suspicious = true]",
            style: {
              "background-color": "#ef4444",
              width: 35,
              height: 35,
              "border-width": 2,
              "border-color": "#ffffff",
            },
          },
          {
            selector: "node[ringColor]",
            style: {
              "border-width": 3,
              "border-color": "data(ringColor)",
            },
          },
          {
            selector: "edge",
            style: {
              width: 1,
              "line-color": "#6b7280",
              "target-arrow-color": "#6b7280",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ]}
        cy={(cy) => {
          cy.on("tap", "node", (evt) => {
            const node = evt.target;
            setSelectedNode(node.data("id"));
          });
        }}
      />

      {/* Explanation Panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 bg-black/90 text-white p-5 rounded-xl text-xs w-72 border border-white/20 shadow-xl">
          <AccountExplanation
            accountId={selectedNode}
            data={data.suspicious_accounts.find(
              (a) => a.account_id === selectedNode
            )}
          />
          <button
            onClick={() => setSelectedNode(null)}
            className="mt-3 text-red-400 text-xs"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}