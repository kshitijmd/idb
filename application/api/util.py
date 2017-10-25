from flask import jsonify


def serialize(obj):
    if obj is None:
        return jsonify(None)

    if not hasattr(obj, "__serialize__"):
        raise TypeError(
            "Object is not serializable. Object must have a __serialize__ function.")
    return jsonify(obj.__serialize__())
