#!/usr/bin/env python3
"""Module that runs concurrent async coroutines."""

import asyncio
from typing import List


wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn wait_random n times and return sorted delays."""
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]
    results = [await task for task in tasks]
    return sorted(results)
