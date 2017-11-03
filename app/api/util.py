from flask import jsonify, request


def serialize(obj):
    if obj is None:
        return jsonify(None)

    if not hasattr(obj, "__serialize__"):
        raise TypeError(
            "Object is not serializable. Object must have a __serialize__ function.")
    return obj.__serialize__()


def all_response(model, data_name='data'):
    query = model.query
    order_by = request.args.get('order_by')
    if order_by and order_by not in (m.key for m in model.__table__.columns):
        return bad_request('Invalid order_by argument.')
    query = query.order_by(order_by)
    pagination = query.paginate()
    return jsonify({
        'pages': pagination.pages,
        'next': pagination.next_num,
        'prev': pagination.prev_num,
        'per_page': pagination.per_page,
        data_name: [serialize(datum) for datum in pagination.items]
    })


def bad_request(message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response
