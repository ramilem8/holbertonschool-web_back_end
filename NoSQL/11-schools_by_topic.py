#!/usr/bin/env python3
"""Return schools that have a specific topic."""


def schools_by_topic(mongo_collection, topic):
    """Return a list of schools matching the given topic."""
    return list(mongo_collection.find({"topics": topic}))