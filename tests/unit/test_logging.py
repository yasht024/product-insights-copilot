import logging
import io
import sys
from pythonjsonlogger import jsonlogger
from product_insights.orchestration.logging import setup_logging, get_logger

def test_json_logging():
    stream = io.StringIO()
    logger = logging.getLogger()
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)
    
    handler = logging.StreamHandler(stream)
    formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(name)s %(message)s', timestamp=True)
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    
    test_logger = get_logger("test")
    test_logger.info("Test message", extra={"key": "value"})
    
    log_output = stream.getvalue()
    assert "Test message" in log_output
    assert "timestamp" in log_output
    assert "value" in log_output
