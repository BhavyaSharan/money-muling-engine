def build_final_json(
    suspicion_scores,
    all_rings,
    G,
    total_accounts,
    processing_time,
    min_score_threshold=50
):
    """
    all_rings must already contain:
    [
        {
            "ring_id": "...",
            "members": [...],
            "pattern": "cycle" | "fan_in" | "fan_out" | "layered_shell"
        }
    ]
    """

    # -----------------------------------
    # 1️⃣ Build suspicious_accounts
    # -----------------------------------
    suspicious_accounts = []

    for account_id, data in suspicion_scores.items():

        score = round(data["suspicion_score"], 2)

        # 🔥 Filter weak accounts
        if score < min_score_threshold:
            continue

        suspicious_accounts.append({
            "account_id": account_id,
            "suspicion_score": score,
            "detected_patterns": sorted(list(data["detected_patterns"])),
            "ring_id": data["ring_id"]
        })

    # Sort descending by score (deterministic)
    suspicious_accounts.sort(
        key=lambda x: (-x["suspicion_score"], x["account_id"])
    )

    suspicious_set = set(a["account_id"] for a in suspicious_accounts)

    # -----------------------------------
    # 2️⃣ Build fraud_rings
    # -----------------------------------
    fraud_rings = []

    for ring in all_rings:

        members = ring["members"]

        # Keep ring only if at least one member survived threshold
        active_members = [m for m in members if m in suspicious_set]

        if not active_members:
            continue

        # Compute dynamic risk score from active members only
        member_scores = [
            suspicion_scores[m]["suspicion_score"]
            for m in active_members
            if m in suspicion_scores
        ]

        avg_score = sum(member_scores) / len(member_scores) if member_scores else 0

        fraud_rings.append({
            "ring_id": ring["ring_id"],
            "member_accounts": sorted(members),  # deterministic order
            "pattern_type": ring["pattern"],
            "risk_score": round(avg_score, 1)
        })

    # Sort rings by risk_score descending
    fraud_rings.sort(
        key=lambda x: (-x["risk_score"], x["ring_id"])
    )

    # -----------------------------------
    # 3️⃣ Build graph_edges (FULL NETWORK)
    # -----------------------------------
    graph_edges = [
        {
            "source": u,
            "target": v
        }
        for u, v in G.edges()
    ]

    # Deterministic edge ordering
    graph_edges.sort(key=lambda x: (x["source"], x["target"]))

    # -----------------------------------
    # 4️⃣ Build summary
    # -----------------------------------
    summary = {
        "total_accounts_analyzed": total_accounts,
        "suspicious_accounts_flagged": len(suspicious_accounts),
        "fraud_rings_detected": len(fraud_rings),
        "processing_time_seconds": round(processing_time, 2)
    }

    # -----------------------------------
    # 5️⃣ Final JSON
    # -----------------------------------
    return {
        "suspicious_accounts": suspicious_accounts,
        "fraud_rings": fraud_rings,
        "summary": summary,
        "graph_edges": graph_edges  # required for full graph rendering
    }