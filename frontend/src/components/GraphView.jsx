import CytoscapeComponent from "react-cytoscapejs";
import { useMemo } from "react";

export default function GraphView({ data }) {
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

    // 1️⃣ Build all nodes from edges
    data.graph_edges.forEach(({ source, target }) => {
      nodes.set(source, true);
      nodes.set(target, true);
    });

    const nodeElements = Array.from(nodes.keys()).map((id) => {
      const suspicious = suspiciousSet.has(id);

      const account = data.suspicious_accounts.find(
        (a) => a.account_id === id
      );

      const ringId = account?.ring_id;
      const ringColor = ringColorMap[ringId];

      return {
        data: {
          id,
          label: id,
          score: account?.suspicion_score || 0,
          patterns: account?.detected_patterns?.join(", ") || "None",
          suspicious,
          ringColor,
        },
      };
    });

    // 2️⃣ Build edges from real transaction data
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
    <div className="w-full h-full">
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "100%" }}
    layout={{ name: "grid" }}
        stylesheet={[
          {
            selector: "node",
            style: {
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              "background-color": "#3b82f6",
              color: "#fff",
              "font-size": 10,
              width: 30,
              height: 30,
            },
          },
          {
            selector: "node[suspicious = true]",
            style: {
              "background-color": "#ef4444",
              width: 45,
              height: 45,
              "border-width": 3,
              "border-color": "#ffffff",
            },
          },
          {
            selector: "node[ringColor]",
            style: {
              "border-width": 4,
              "border-color": "data(ringColor)",
            },
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "#9ca3af",
              "target-arrow-color": "#9ca3af",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ]}
        cy={(cy) => {
          cy.on("mouseover", "node", function (evt) {
            const node = evt.target;
            node.qtip({
              content: `
                <div style="padding:6px;">
                  <strong>${node.data("id")}</strong><br/>
                  Score: ${node.data("score")}<br/>
                  Patterns: ${node.data("patterns")}
                </div>
              `,
              show: { event: evt.type, ready: true },
              hide: { event: "mouseout unfocus" },
              style: {
                classes: "qtip-dark",
              },
            });
          });
        }}
      />
    </div>
  );
}