from flask import jsonify


def serialize(obj):
    if obj is None:
        return jsonify(None)

    if not hasattr(obj, "__serialize__"):
        raise TypeError(
            "Object is not serializable. Object must have a __serialize__ function.")
    return obj.__serialize__()


def all_response(model, data_name='data'):
    pagination = model.query.paginate()
    return jsonify({
        'pages': pagination.pages,
        'next': pagination.next_num,
        'prev': pagination.prev_num,
        'per_page': pagination.per_page,
        data_name: [serialize(datum) for datum in pagination.items]
    })
