import pandas as pd

REQUIRED_COLUMNS = [
    "transaction_id",
    "sender_id",
    "receiver_id",
    "amount",
    "timestamp"
]

def validate_and_load_csv(file) -> pd.DataFrame:
    try:
        df = pd.read_csv(file)
    except Exception:
        raise ValueError("Invalid CSV file")

    # 1️⃣ Check required columns (order independent)
    if set(df.columns) != set(REQUIRED_COLUMNS):
        raise ValueError(
            f"CSV must contain exactly these columns: {REQUIRED_COLUMNS}"
        )

    # Reorder to required structure
    df = df[REQUIRED_COLUMNS]

    # 2️⃣ Check empty values
    if df.isnull().any().any():
        raise ValueError("CSV contains missing values")

    # 3️⃣ Ensure transaction_id unique
    if df["transaction_id"].duplicated().any():
        raise ValueError("Duplicate transaction_id detected")

    # 4️⃣ Validate amount
    try:
        df["amount"] = df["amount"].astype(float)
    except ValueError:
        raise ValueError("Amount column must be numeric")

    if (df["amount"] <= 0).any():
        raise ValueError("Amount must be positive")

    # 5️⃣ Validate timestamp format
    try:
        df["timestamp"] = pd.to_datetime(
            df["timestamp"],
            format="%Y-%m-%d %H:%M:%S"
        )
    except Exception:
        raise ValueError(
            "Timestamp must be in format YYYY-MM-DD HH:MM:SS"
        )

    # 6️⃣ Ensure sender != receiver
    if (df["sender_id"] == df["receiver_id"]).any():
        raise ValueError("Sender and receiver cannot be the same")

    return df