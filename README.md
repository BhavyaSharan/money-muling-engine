# 🕵️ Financial Forensics Engine  
## Graph-Based Money Muling Detection System  
### RIFT 2026 Hackathon – Graph Theory Track  

---

## 🚀 Live Demo

🔗 Frontend Live URL:  
https://your-frontend-url.com  

🔗 Backend API URL:  
https://money-muling-engine-1.onrender.com  

---

## 📌 Project Overview

The **Financial Forensics Engine** is a web-based graph analytics system designed to detect sophisticated money muling networks from transaction datasets.

Money muling is a structured financial crime where illicit funds are routed across multiple accounts to obscure origin. Traditional relational databases fail to detect multi-hop network patterns effectively.

This system uses **graph theory + temporal analysis + multi-pattern scoring** to identify suspicious financial networks.

The application:
- Accepts CSV file uploads
- Builds a directed transaction graph
- Detects fraud rings
- Generates structured JSON output
- Provides interactive graph visualization
- Flags suspicious accounts with explainable scoring

---

## 🧠 Problem Understanding

Money muling networks often involve:

- 🔁 Circular fund routing (A → B → C → A)
- 💸 Smurfing (many small deposits aggregated & redistributed)
- 🏦 Layered shell accounts (low-activity intermediaries)

These patterns require graph traversal and temporal analysis.

---

## 🛠 Tech Stack

### Backend
- Python 3.11
- FastAPI
- NetworkX
- Pandas
- Uvicorn
- Render (Deployment)

### Frontend
- React (Vite)
- Tailwind CSS
- Cytoscape.js (Graph Visualization)
- Axios
- Vercel / Netlify (Deployment)

---

## 🏗 System Architecture

```
CSV Upload
   ↓
Validation Layer
   ↓
Directed Graph Builder
   ↓
Fraud Pattern Detectors
   • Cycle Detection
   • Smurfing Detection
   • Layered Shell Detection
   ↓
Suspicion Scoring Engine
   ↓
JSON Report Generator
   ↓
Interactive Graph Visualization
```

---

## 🔍 Algorithm Approach

### 1️⃣ Graph Construction

Each transaction is modeled as:

- Node → sender_id
- Node → receiver_id
- Directed Edge → sender → receiver

Time Complexity:  
O(N)  
Where N = number of transactions

---

### 2️⃣ Cycle Detection (Bounded 3-Hop)

Detects 3-length circular flows:
A → B → C → A

Constraints applied:
- Only low-activity accounts considered
- High-degree merchant accounts excluded

Time Complexity:  
O(N × d²)  
Where d = average node degree

---

### 3️⃣ Smurfing Detection (Fan-In / Fan-Out)

Fan-In:
- ≥ 10 unique senders
- Within 72-hour window

Fan-Out:
- ≥ 10 unique receivers
- Within 72-hour window

Merchant filtering:
- Accounts with high transaction volume excluded

Time Complexity:  
O(N log N)

---

### 4️⃣ Layered Shell Detection

Detects chains:
A → B → C → D

Where intermediate accounts:
- Have only 2–3 total transactions
- Act as pass-through nodes

Bounded path search ensures performance.

---

## 📊 Suspicion Score Methodology

Each account accumulates weighted scores:

| Pattern Type     | Weight |
|------------------|--------|
| Cycle            | +25    |
| Fan-In           | +20    |
| Fan-Out          | +20    |
| Layered Shell    | +30    |

### Multi-Signal Rule

- Account must appear in **at least 2 patterns**
- Single-pattern detections discarded
- High-degree accounts excluded (>12 transactions)

### Threshold

Minimum suspicion score required: **50**

### Confidence Levels

| Score | Confidence |
|-------|------------|
| 80+   | High       |
| 65–79 | Medium     |
| 50–64 | Low        |

This approach improves precision and minimizes false positives.

---

## 📤 JSON Output Format

The system generates downloadable JSON in required hackathon format:

```json
{
  "suspicious_accounts": [
    {
      "account_id": "ACC_00123",
      "suspicion_score": 87.5,
      "detected_patterns": ["cycle", "fan_in"],
      "ring_id": "RING_001"
    }
  ],
  "fraud_rings": [
    {
      "ring_id": "RING_001",
      "member_accounts": ["ACC_00123", "ACC_00456"],
      "pattern_type": "cycle",
      "risk_score": 92.3
    }
  ],
  "summary": {
    "total_accounts_analyzed": 500,
    "suspicious_accounts_flagged": 15,
    "fraud_rings_detected": 4,
    "processing_time_seconds": 2.3
  }
}
```

---

## ⚡ Performance

Tested on 10,000 transactions:

- Processing Time: 3–10 seconds
- Deterministic JSON output
- Controlled false positives
- Stable under hidden datasets

---

## 💻 Installation & Setup

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:
http://localhost:8000

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

---

## 📂 Usage Instructions

1. Open the web application
2. Upload CSV file (exact required format)
3. View:
   - Investigation Summary
   - Fraud Ring Table
   - Interactive Graph
4. Click nodes to see account explanation
5. Download structured JSON report

---

## ⚠ Known Limitations

- Visualization may become dense for >7,000 nodes
- Cycle detection limited to 3-hop bounded cycles
- Not optimized for >50,000 transactions
- Designed for hackathon constraints (not production banking scale)

---

## 👥 Team Members

- Ujjwal Tayal  
- Bhavya Sharan 
- Aryan
- G Sagar

---

## 🏁 Conclusion

The Financial Forensics Engine demonstrates:

- Strong graph-theoretic modeling
- Bounded complexity fraud detection
- Multi-pattern precision scoring
- Deterministic output formatting
- Interactive explainable visualization
- Production-ready deployment

---

### “Follow the money.”
