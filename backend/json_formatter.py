def build_final_json(
    suspicion_scores,
    cycle_rings,
    smurf_rings,
    shell_rings,
    total_accounts,
    processing_time
):
    # ---------- suspicious_accounts ----------
    suspicious_accounts = []

    for account_id, data in suspicion_scores.items():
        suspicious_accounts.append({
            "account_id": account_id,
            "suspicion_score": round(data["suspicion_score"], 2),
            "detected_patterns": data["detected_patterns"],
            "ring_id": data["ring_id"]
        })

    suspicious_accounts.sort(
        key=lambda x: x["suspicion_score"],
        reverse=True
    )

    # ---------- fraud_rings ----------
    fraud_rings = []

    def add_rings(rings, pattern_type):
        for ring in rings:
            fraud_rings.append({
                "ring_id": ring["ring_id"],
                "member_accounts": ring["members"],
                "pattern_type": pattern_type,
                "risk_score": 95.0 if pattern_type == "cycle" else 85.0
            })

    add_rings(cycle_rings, "cycle")
    add_rings(smurf_rings, "smurfing")
    add_rings(shell_rings, "layered-shell")

    # ---------- summary ----------
    summary = {
        "total_accounts_analyzed": total_accounts,
        "suspicious_accounts_flagged": len(suspicious_accounts),
        "fraud_rings_detected": len(fraud_rings),
        "processing_time_seconds": round(processing_time, 2)
    }

    return {
        "suspicious_accounts": suspicious_accounts,
        "fraud_rings": fraud_rings,
        "summary": summary
    }
