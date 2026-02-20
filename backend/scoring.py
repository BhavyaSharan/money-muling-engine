from collections import defaultdict

def compute_suspicion_scores(G, all_rings):

    scores = defaultdict(lambda: {
        "suspicion_score": 0.0,
        "detected_patterns": [],
        "ring_id": None
    })

    # -----------------------------
    # Assign base weights per pattern
    # -----------------------------
    for ring in all_rings:

        pattern = ring["pattern"]

        for acc in ring["members"]:

            # 🔥 GLOBAL MERCHANT FILTER
            # Ignore high activity accounts
            if G.nodes[acc]["total_tx_count"] > 12:
                continue

            if pattern == "cycle":
                scores[acc]["suspicion_score"] += 25

            elif pattern == "fan_in":
                scores[acc]["suspicion_score"] += 20

            elif pattern == "fan_out":
                scores[acc]["suspicion_score"] += 20

            elif pattern == "layered_shell":
                scores[acc]["suspicion_score"] += 30

            scores[acc]["detected_patterns"].append(pattern)
            scores[acc]["ring_id"] = ring["ring_id"]

    # -----------------------------
    # MULTI-SIGNAL REQUIREMENT
    # -----------------------------
    for acc, data in scores.items():

        unique_patterns = set(data["detected_patterns"])

        # ❌ REQUIRE AT LEAST 2 PATTERNS
        if len(unique_patterns) < 2:
            data["suspicion_score"] = 0
            continue

        # Bonus for multi-signal
        data["suspicion_score"] += 25

        data["suspicion_score"] = min(100, data["suspicion_score"])
        data["detected_patterns"] = list(unique_patterns)

    return scores