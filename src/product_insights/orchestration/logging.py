"""Structured logging configuration for Phase 4."""

import logging
import sys

from pythonjsonlogger import jsonlogger


def setup_logging(level: int = logging.INFO, as_json: bool = True) -> None:
    """Configure the root logger with either JSON or text formatting."""
    logger = logging.getLogger()
    
    # Remove existing handlers if setup is called multiple times
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)
        
    logger.setLevel(level)
    handler = logging.StreamHandler(sys.stdout)
    
    if as_json:
        formatter = jsonlogger.JsonFormatter(
            '%(asctime)s %(levelname)s %(name)s %(message)s',
            timestamp=True
        )
    else:
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        
    handler.setFormatter(formatter)
    logger.addHandler(handler)

def get_logger(name: str) -> logging.Logger:
    """Get a logger instance with the given name."""
    return logging.getLogger(name)
