import networkx as nx

def build_transaction_graph(df):
    """
    Builds a directed graph from transaction dataframe
    """
    G = nx.DiGraph()

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

    # Add node-level metadata
    for node in G.nodes:
        G.nodes[node]["in_degree"] = G.in_degree(node)
        G.nodes[node]["out_degree"] = G.out_degree(node)
        G.nodes[node]["total_tx_count"] = (
            G.in_degree(node) + G.out_degree(node)
        )

    return G
