#!/usr/bin/env python3
"""Module that creates a tuple from a key and squared value."""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Return a tuple containing a string and the square of a number."""
    return (k, float(v ** 2))
