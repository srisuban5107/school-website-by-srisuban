from backend.models.parent_model import get_parent, get_children


def fetch_parent(parent_id):
    return get_parent(parent_id)


def fetch_children(parent_id):
    return get_children(parent_id)