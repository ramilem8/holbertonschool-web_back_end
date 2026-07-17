#!/usr/bin/env python3
"""Update topics of school documents."""


def update_topics(mongo_collection, name, topics):
    """Update all documents with the given name by setting the topics field."""
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )