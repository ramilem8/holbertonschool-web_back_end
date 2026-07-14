#!/usr/bin/env python3
"""
Simple helper function module.
"""


def index_range(page, page_size):
    """
    Return a tuple of start and end index for pagination.

    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        tuple: (start_index, end_index)
    """
    end_index = page * page_size
    start_index = end_index - page_size
    return (start_index, end_index)