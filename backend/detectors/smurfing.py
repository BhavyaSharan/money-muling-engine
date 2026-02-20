from datetime import timedelta

def detect_smurfing(df, time_window_hours=72, threshold=10):

    rings = []

    df = df.sort_values("timestamp")

    # ---------------------
    # FAN-IN
    # ---------------------
    grouped_in = df.groupby("receiver_id")

    for receiver, group in grouped_in:

        # 🔥 Skip high-volume accounts (merchant filter)
        if len(group) > 50:
            continue

        group = group.sort_values("timestamp")

        start_time = group["timestamp"].min()
        end_time = group["timestamp"].max()

        if end_time - start_time > timedelta(hours=time_window_hours):
            continue

        unique_senders = group["sender_id"].nunique()

        if unique_senders >= threshold:
            rings.append({
                "members": list(group["sender_id"].unique()) + [receiver],
                "pattern": "fan_in"
            })

    # ---------------------
    # FAN-OUT
    # ---------------------
    grouped_out = df.groupby("sender_id")

    for sender, group in grouped_out:

        # 🔥 Skip high-volume accounts (merchant filter)
        if len(group) > 50:
            continue

        group = group.sort_values("timestamp")

        start_time = group["timestamp"].min()
        end_time = group["timestamp"].max()

        if end_time - start_time > timedelta(hours=time_window_hours):
            continue

        unique_receivers = group["receiver_id"].nunique()

        if unique_receivers >= threshold:
            rings.append({
                "members": [sender] + list(group["receiver_id"].unique()),
                "pattern": "fan_out"
            })

    return rings