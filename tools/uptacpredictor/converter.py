import sqlite3
import json
import sys
import os
import re

def clean_rank(value):
    """Convert rank to int after removing commas/spaces. 
       Handles integers and decimals like '1234.00'."""
    if value is None:
        return None
    value = str(value).strip()
    # Remove commas and spaces
    value = re.sub(r'[,\s]', '', value)
    if value == "":
        return None
    # Try to convert to float (handles '1234' and '1234.00')
    try:
        num = float(value)
        # If it's a whole number (or .00), return int
        if num.is_integer():
            return int(num)
        else:
            # For ranks, we expect whole numbers; skip fractional ones
            return None
    except ValueError:
        return None

def detect_year(db_path):
    """Try to extract a 4-digit year from the filename, e.g. cutoff_2025.db -> 2025."""
    match = re.search(r'(20\d{2})', os.path.basename(db_path))
    if match:
        return int(match.group(1))
    return None

def convert_db_to_json(db_path, output_dir="data", year=None):
    if not os.path.exists(db_path):
        print(f"ERROR: File not found: {db_path}")
        return

    if year is None:
        year = detect_year(db_path)
        if year is None:
            print(f"ERROR: Could not detect year from '{db_path}'. Pass --year manually.")
            return

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    # find the table name automatically (in case it's not always "cutoff")
    cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cur.fetchall()]
    table_name = "cutoff" if "cutoff" in tables else tables[0]

    cur.execute(f'SELECT * FROM "{table_name}"')
    rows = cur.fetchall()

    data = []
    skipped = 0
    for row in rows:
        opening = clean_rank(row["Opening Rank"])
        closing = clean_rank(row["Closing Rank"])

        if closing is None:
            skipped += 1
            continue  # predictor needs closing rank, skip unusable rows

        data.append({
            "round": row["Round"],
            "institute": row["Institute"],
            "program": row["Program"],
            "stream": row["Stream"],
            "quota": row["Quota"],
            "category": row["Category"],
            "seatGender": row["Seat Gender"],
            "openingRank": opening,
            "closingRank": closing,
            "remark": row["Remark"],
            "type": row["type"],
            "year": year
        })

    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, f"cutoff_{year}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ {db_path} -> {out_path}")
    print(f"   Converted: {len(data)} rows | Skipped (invalid rank): {skipped}")

def convert_folder(folder_path, output_dir="data"):
    """Convert every .db file in a folder at once (e.g. cutoff_2023.db, cutoff_2024.db, cutoff_2025.db)."""
    db_files = [f for f in os.listdir(folder_path) if f.endswith(".db")]
    if not db_files:
        print(f"No .db files found in {folder_path}")
        return
    for f in db_files:
        convert_db_to_json(os.path.join(folder_path, f), output_dir)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python converter.py <path-to-db-file>")
        print("  python converter.py --folder <folder-with-db-files>")
        print("  python converter.py <path-to-db-file> --year 2024")
        sys.exit(1)

    if sys.argv[1] == "--folder":
        convert_folder(sys.argv[2])
    else:
        db_path = sys.argv[1]
        year_arg = None
        if "--year" in sys.argv:
            idx = sys.argv.index("--year")
            year_arg = int(sys.argv[idx + 1])
        convert_db_to_json(db_path, year=year_arg)