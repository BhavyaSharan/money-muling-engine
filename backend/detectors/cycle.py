import networkx as nx

def detect_cycles(G, min_len=3, max_len=5):
    """
    Detects directed cycles of length 3–5
    Returns list of rings:
    [
      {
        "ring_id": "RING_001",
        "members": [A, B, C],
        "pattern": "cycle"
      }
    ]
    """
    rings = []
    seen_cycles = set()
    ring_counter = 1

    for cycle in nx.simple_cycles(G):
        cycle_len = len(cycle)

        if min_len <= cycle_len <= max_len:
            # Normalize cycle to avoid duplicates
            normalized = tuple(sorted(cycle))
            if normalized in seen_cycles:
                continue

            seen_cycles.add(normalized)

            ring_id = f"RING_{ring_counter:03d}"
            ring_counter += 1

            rings.append({
                "ring_id": ring_id,
                "members": cycle,
                "pattern": "cycle"
            })

    return rings
