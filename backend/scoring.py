from collections import defaultdict

def compute_suspicion_scores(cycle_rings, smurf_rings, shell_rings):
    """
    Returns dict:
    {
      account_id: {
        suspicion_score,
        detected_patterns,
        ring_id
      }
    }
    """

    scores = defaultdict(lambda: {
        "suspicion_score": 0.0,
        "detected_patterns": [],
        "ring_id": None
    })

    # ---------- CYCLES ----------
    for ring in cycle_rings:
        for acc in ring["members"]:
            scores[acc]["suspicion_score"] += 40
            scores[acc]["detected_patterns"].append("cycle")
            scores[acc]["ring_id"] = ring["ring_id"]

    # ---------- SMURFING ----------
    for ring in smurf_rings:
        pattern = ring["pattern"]
        for acc in ring["members"]:
            if pattern == "fan-in":
                scores[acc]["suspicion_score"] += 30
                scores[acc]["detected_patterns"].append("fan-in")
            elif pattern == "fan-out":
                scores[acc]["suspicion_score"] += 30
                scores[acc]["detected_patterns"].append("fan-out")
            scores[acc]["ring_id"] = ring["ring_id"]

    # ---------- SHELL NETWORK ----------
    for ring in shell_rings:
        for acc in ring["members"]:
            scores[acc]["suspicion_score"] += 25
            scores[acc]["detected_patterns"].append("layered-shell")
            scores[acc]["ring_id"] = ring["ring_id"]

    # ---------- MULTI-PATTERN BONUS ----------
    for acc, data in scores.items():
        if len(set(data["detected_patterns"])) > 1:
            data["suspicion_score"] += 10

        # Clamp score
        data["suspicion_score"] = min(100.0, data["suspicion_score"])

        # Deduplicate patterns
        data["detected_patterns"] = list(set(data["detected_patterns"]))

    return scores
