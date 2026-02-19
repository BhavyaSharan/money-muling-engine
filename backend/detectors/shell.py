import networkx as nx

def detect_shell_networks(G, min_hops=3, max_hops=5):
    """
    Detect layered shell networks.
    Keeps ONLY maximal (longest) paths.
    Sub-paths are discarded.
    """

    candidate_paths = []

    nodes = list(G.nodes)

    # 1️⃣ Collect all valid shell paths
    for source in nodes:
        for target in nodes:
            if source == target:
                continue

            try:
                paths = nx.all_simple_paths(
                    G,
                    source=source,
                    target=target,
                    cutoff=max_hops
                )
            except nx.NetworkXNoPath:
                continue

            for path in paths:
                if len(path) < min_hops:
                    continue

                intermediates = path[1:-1]
                if not intermediates:
                    continue

                # Shell condition: intermediates must be low-activity
                valid = True
                for node in intermediates:
                    if G.nodes[node]["total_tx_count"] not in (2, 3):
                        valid = False
                        break

                if valid:
                    candidate_paths.append(path)

    # 2️⃣ Remove sub-paths (keep only maximal paths)
    maximal_paths = []
    for p in candidate_paths:
        p_set = set(p)
        is_subset = False

        for q in candidate_paths:
            q_set = set(q)
            if p_set < q_set:  # strict subset
                is_subset = True
                break

        if not is_subset:
            maximal_paths.append(p)

    # 3️⃣ Build rings
    rings = []
    ring_counter = 1
    seen = set()

    for path in maximal_paths:
        key = frozenset(path)
        if key in seen:
            continue
        seen.add(key)

        rings.append({
            "ring_id": f"RING_{ring_counter:03d}",
            "members": path,
            "pattern": "layered-shell"
        })
        ring_counter += 1

    return rings
