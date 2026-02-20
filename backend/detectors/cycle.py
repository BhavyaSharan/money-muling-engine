def detect_cycles(G):
    rings = []
    seen = set()

    for u in G.nodes:

        # 🔥 Only low-activity nodes
        if G.nodes[u]["total_tx_count"] > 4:
            continue

        for v in G.successors(u):

            if G.nodes[v]["total_tx_count"] > 6:
                continue

            for w in G.successors(v):

                if G.nodes[w]["total_tx_count"] > 6:
                    continue

                if w == u or w == v:
                    continue

                if G.has_edge(w, u):

                    cycle = tuple(sorted([u, v, w]))

                    if cycle in seen:
                        continue

                    seen.add(cycle)

                    rings.append({
                        "members": [u, v, w],
                        "pattern": "cycle"
                    })

    return rings