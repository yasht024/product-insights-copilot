import sqlite3
from pathlib import Path
from product_insights.persistence.repository import SQLiteRepository

def test_purge_old_records(tmp_path: Path):
    db_path = tmp_path / "test.sqlite3"
    repo = SQLiteRepository(db_path)
    
    # Inject old fake data
    with repo.connection:
        repo.connection.execute("INSERT INTO source_batches VALUES ('b1', 'google_play', 'p1', 'f1', '2020-01-01T00:00:00')")
        repo.connection.execute(
            "INSERT INTO raw_reviews VALUES ('r1', 'google_play', 'k1', 5, 't1', 'tx1', '2020-01-01T00:00:00', 'orig', 'en', '2020-01-01T00:00:00', 'b1', 'fp1')"
        )
    
    counts = repo.purge_old_records(raw_days=7, sanitized_days=180, audit_days=365)
    
    assert counts["raw"] == 1
    
    cursor = repo.connection.execute("SELECT count(*) as c FROM raw_reviews")
    assert cursor.fetchone()["c"] == 0

    cursor = repo.connection.execute("SELECT count(*) as c FROM source_batches")
    assert cursor.fetchone()["c"] == 0
    
    repo.close()
