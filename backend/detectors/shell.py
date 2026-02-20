import networkx as nx

def detect_shell_networks(G):

    rings = []
    seen = set()

    for u in G.nodes:
        # Only start from low-activity nodes
        if G.nodes[u]["total_tx_count"] > 2:
            continue

        for v in G.successors(u):
            if G.nodes[v]["total_tx_count"] > 2:
                continue

            for w in G.successors(v):
                if w == u:
                    continue

                if G.nodes[w]["total_tx_count"] > 2:
                    continue

                path = [u, v, w]
                key = frozenset(path)

                if key in seen:
                    continue

                seen.add(key)

                rings.append({
                    "members": path,
                    "pattern": "layered_shell"
                })

    return rings