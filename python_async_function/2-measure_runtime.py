#!/usr/bin/env python3
"""Module that measures runtime of async execution."""

import time
import asyncio
from typing import Callable


wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Return average execution time of wait_n(n, max_delay)."""
    start_time = time.time()
    asyncio.run(wait_n(n, max_delay))
    end_time = time.time()
    return (end_time - start_time) / n
