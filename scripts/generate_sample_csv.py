import csv
import random
import datetime

OUTPUT_FILE = "./datasets/sample_transactions.csv"

CONTRACTORS = [
    "Sharma Infra Ltd", "Unity Builders", "Skyline Constructions",
    "MetroBuild Co", "GreenEarth Developers", "Omkar Infra",
    "UrbanLift Engineers", "BlueRock EPC"
]

BLACKLISTED = ["Omkar Infra"]

PROJECTS = [
    "Slum Rehabilitation - Sector 12",
    "Road Widening Phase 2",
    "Housing Project Zone B",
    "Metro Line 3 - Subsystem Work",
]

DESCRIPTIONS = [
    "Material procurement",
    "Labor payment",
    "Structural work invoice",
    "Machinery rental",
    "Project management fee",
]

def random_date():
    """Generate a random datetime in 2024."""
    start = datetime.datetime(2024, 1, 1, 0, 0)
    end = datetime.datetime(2024, 12, 31, 23, 59)

    delta = end - start
    rand_sec = random.randint(0, int(delta.total_seconds()))
    return start + datetime.timedelta(seconds=rand_sec)

def generate_normal_transaction(i):
    contractor = random.choice(CONTRACTORS)
    amount = random.randint(5000, 200000)  # 5k–2L
    timestamp = random_date().strftime("%Y-%m-%d %H:%M:%S")
    project = random.choice(PROJECTS)
    desc = random.choice(DESCRIPTIONS)

    return [i, amount, contractor, timestamp, project, desc]

def generate_anomalies(start_id):
    anomalies = []

    # 1. Duplicate payments
    duplicate_base = generate_normal_transaction(start_id)
    dup1 = duplicate_base.copy()
    dup2 = duplicate_base.copy()
    dup2[0] = start_id + 1  # change ID only

    anomalies.append(dup1)
    anomalies.append(dup2)

    # 2. Budget deviation > 20%
    big_amount_tx = generate_normal_transaction(start_id + 2)
    big_amount_tx[1] *= 2  # inflate amount
    anomalies.append(big_amount_tx)

    # 3. Late night transaction (2 AM)
    late_tx = generate_normal_transaction(start_id + 3)
    late_tx[3] = late_tx[3].split(" ")[0] + " 02:13:00"
    anomalies.append(late_tx)

    # 4. Blacklisted contractor
    blacklist_tx = generate_normal_transaction(start_id + 4)
    blacklist_tx[2] = random.choice(BLACKLISTED)
    anomalies.append(blacklist_tx)

    return anomalies

def generate_csv():
    rows = []
    num_normal = 120

    # normal rows
    for i in range(1, num_normal + 1):
        rows.append(generate_normal_transaction(i))

    # anomalies
    anomaly_rows = generate_anomalies(num_normal + 1)
    rows.extend(anomaly_rows)

    # write CSV
    with open(OUTPUT_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "amount", "contractor", "timestamp", "project", "description"])
        writer.writerows(rows)

    print(f"Generated CSV at: {OUTPUT_FILE}")
    print(f"Total rows: {len(rows)} (Including anomalies)")

if __name__ == "__main__":
    generate_csv()
