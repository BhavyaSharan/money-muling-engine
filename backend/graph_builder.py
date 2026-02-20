import networkx as nx

def build_transaction_graph(df):

    # 🔥 IMPORTANT: Use MultiDiGraph
    G = nx.MultiDiGraph()

    for _, row in df.iterrows():
        sender = row["sender_id"]
        receiver = row["receiver_id"]

        G.add_node(sender)
        G.add_node(receiver)

        G.add_edge(
            sender,
            receiver,
            transaction_id=row["transaction_id"],
            amount=row["amount"],
            timestamp=row["timestamp"]
        )

    # Precompute node metrics safely
    for node in G.nodes:
        in_deg = G.in_degree(node)
        out_deg = G.out_degree(node)

        G.nodes[node]["in_degree"] = in_deg
        G.nodes[node]["out_degree"] = out_deg
        G.nodes[node]["total_tx_count"] = in_deg + out_deg

        # 🔥 Add useful features for scoring
        G.nodes[node]["is_low_activity"] = (in_deg + out_deg) <= 2
        G.nodes[node]["is_possible_merchant"] = (
            in_deg >= 20 and out_deg >= 20
        )

    return G