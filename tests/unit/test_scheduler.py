import zoneinfo
from datetime import datetime
from croniter import croniter

def test_croniter_schedule():
    tz = zoneinfo.ZoneInfo("Asia/Kolkata")
    now = datetime(2023, 10, 10, 8, 0, tzinfo=tz) # Tuesday, Oct 10, 2023
    cron = croniter("0 9 * * 1", now)
    next_run = cron.get_next(datetime)
    
    assert next_run.weekday() == 0 # Monday
    assert next_run.hour == 9
    assert next_run.minute == 0
    assert next_run.year == 2023
    assert next_run.month == 10
    assert next_run.day == 16 # Next Monday
