def assign_ring_ids(all_rings):
    for i, ring in enumerate(all_rings, start=1):
        ring["ring_id"] = f"RING_{i:03d}"
    return all_rings