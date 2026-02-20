from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import time

from utils import validate_and_load_csv
from graph_builder import build_transaction_graph
from detectors.cycle import detect_cycles
from detectors.smurfing import detect_smurfing
from detectors.shell import detect_shell_networks
from scoring import compute_suspicion_scores
from json_formatter import build_final_json

app = FastAPI(title="Financial Forensics Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "API is running"}


@app.post("/upload-csv")
def upload_csv(file: UploadFile = File(...)):

    overall_start = time.time()

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed"
        )

    # -------------------------
    # CSV Validation
    # -------------------------
    t0 = time.time()
    try:
        df = validate_and_load_csv(file.file)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    print(f"[TIME] CSV Validation: {round(time.time() - t0, 3)}s", flush=True)

    # -------------------------
    # Graph Building
    # -------------------------
    t1 = time.time()
    G = build_transaction_graph(df)
    print(f"[TIME] Graph Build: {round(time.time() - t1, 3)}s", flush=True)

    # -------------------------
    # Smurf Detection FIRST
    # -------------------------
    t2 = time.time()
    smurf_rings = detect_smurfing(df)
    print(f"[TIME] Smurf Detection: {round(time.time() - t2, 3)}s", flush=True)

    # -------------------------
    # Shell Detection SECOND
    # -------------------------
    t3 = time.time()
    shell_rings = detect_shell_networks(G)
    print(f"[TIME] Shell Detection: {round(time.time() - t3, 3)}s", flush=True)

    print("Smurf + Shell finished. Starting Cycle Detection...", flush=True)

    # -------------------------
    # Cycle Detection LAST
    # -------------------------
    t4 = time.time()
    cycle_rings = detect_cycles(G)
    print(f"[TIME] Cycle Detection: {round(time.time() - t4, 3)}s", flush=True)

    # -------------------------
    # Merge Rings
    # -------------------------
    all_rings = smurf_rings + shell_rings + cycle_rings

    for idx, ring in enumerate(all_rings, start=1):
        ring["ring_id"] = f"RING_{idx:03d}"

    # -------------------------
    # Scoring
    # -------------------------
    t5 = time.time()
    suspicion_scores = compute_suspicion_scores(G, all_rings)
    print(f"[TIME] Scoring: {round(time.time() - t5, 3)}s", flush=True)

    # -------------------------
    # Final JSON
    # -------------------------
    processing_time = round(time.time() - overall_start, 3)

    final_json = build_final_json(
        suspicion_scores=suspicion_scores,
        all_rings=all_rings,
        G=G,
        total_accounts=G.number_of_nodes(),
        processing_time=processing_time
    )

    print(f"[TIME] TOTAL PROCESSING: {processing_time}s", flush=True)
    print("------------------------------------------------", flush=True)

    return final_json