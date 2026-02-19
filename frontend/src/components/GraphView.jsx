import CytoscapeComponent from "react-cytoscapejs";

export default function GraphView({ data }) {
  if (!data) return null;

  // ----------- Build Nodes -----------
  const nodes = data.suspicious_accounts.map((acc) => ({
    data: {
      id: acc.account_id,
      label: acc.account_id,
      score: acc.suspicion_score,
      patterns: acc.detected_patterns.join(", "),
    },
  }));

  // ----------- Build Edges from Fraud Rings -----------
  const edges = [];

  data.fraud_rings.forEach((ring) => {
    const members = ring.member_accounts;

    for (let i = 0; i < members.length - 1; i++) {
      edges.push({
        data: {
          id: `${members[i]}-${members[i + 1]}-${ring.ring_id}`,
          source: members[i],
          target: members[i + 1],
          ring: ring.ring_id,
        },
      });
    }
  });

  const elements = [...nodes, ...edges];

  return (
    <div className="h-[420px] w-full border rounded-lg">
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "100%" }}
        layout={{ name: "cose" }}
        stylesheet={[
          {
            selector: "node",
            style: {
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              "background-color": "#3b82f6", // blue
              color: "#ffffff",
              "font-size": 12,
              width: 40,
              height: 40,
            },
          },
          {
            selector: "node[score > 0]",
            style: {
              "background-color": "#ef4444", // red for suspicious
              width: 50,
              height: 50,
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
      />
    </div>
  );
}
