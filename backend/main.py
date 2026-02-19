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
    start_time = time.time()

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed"
        )

    try:
        df = validate_and_load_csv(file.file)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    # 1️⃣ Build graph
    G = build_transaction_graph(df)

    # 2️⃣ Detect fraud patterns
    cycle_rings = detect_cycles(G)
    smurf_rings = detect_smurfing(df)
    shell_rings = detect_shell_networks(G)

    # 3️⃣ Compute suspicion scores
    suspicion_scores = compute_suspicion_scores(
        cycle_rings,
        smurf_rings,
        shell_rings
    )

    processing_time = round(time.time() - start_time, 3)

    # 4️⃣ Build FINAL judge-required JSON
    final_json = build_final_json(
        suspicion_scores=suspicion_scores,
        cycle_rings=cycle_rings,
        smurf_rings=smurf_rings,
        shell_rings=shell_rings,
        total_accounts=G.number_of_nodes(),
        processing_time=processing_time
    )

    return final_json
