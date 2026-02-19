from collections import defaultdict
from datetime import timedelta

def detect_smurfing(df, time_window_hours=72, threshold=10):
    """
    Detects fan-in and fan-out smurfing patterns
    Returns list of rings
    """
    rings = []
    ring_counter = 1

    # Sort transactions by time
    df = df.sort_values("timestamp")

    # ---------- FAN-IN ----------
    fan_in_groups = defaultdict(list)

    for _, row in df.iterrows():
        fan_in_groups[row["receiver_id"]].append(row)

    for receiver, txs in fan_in_groups.items():
        senders = set()
        start_time = txs[0]["timestamp"]

        for tx in txs:
            if tx["timestamp"] - start_time <= timedelta(hours=time_window_hours):
                senders.add(tx["sender_id"])

        if len(senders) >= threshold:
            rings.append({
                "ring_id": f"RING_{ring_counter:03d}",
                "members": list(senders) + [receiver],
                "pattern": "fan-in"
            })
            ring_counter += 1

    # ---------- FAN-OUT ----------
    fan_out_groups = defaultdict(list)

    for _, row in df.iterrows():
        fan_out_groups[row["sender_id"]].append(row)

    for sender, txs in fan_out_groups.items():
        receivers = set()
        start_time = txs[0]["timestamp"]

        for tx in txs:
            if tx["timestamp"] - start_time <= timedelta(hours=time_window_hours):
                receivers.add(tx["receiver_id"])

        if len(receivers) >= threshold:
            rings.append({
                "ring_id": f"RING_{ring_counter:03d}",
                "members": [sender] + list(receivers),
                "pattern": "fan-out"
            })
            ring_counter += 1

    return rings
