from flask import jsonify, request
from sqlalchemy import desc


def serialize(obj):
    if obj is None:
        return jsonify(None)

    if not hasattr(obj, "__serialize__"):
        raise TypeError(
            "Object is not serializable. Object must have a __serialize__ function.")
    return obj.__serialize__()


def all_response(model, data_name='data'):
    query = order_query(model.query, model.__table__.columns)

    pagination = query.paginate()
    return jsonify({
        'pages': pagination.pages,
        'next': pagination.next_num,
        'prev': pagination.prev_num,
        'per_page': pagination.per_page,
        data_name: [serialize(datum) for datum in pagination.items]
    })


def filter_query(query):
    pass


def order_query(query, columns):
    order_by = request.args.get('order_by')
    if order_by and order_by not in (m.key for m in columns):
        return bad_request('Invalid order_by argument.')
    elif order_by:
        if request.args.get('desc'):
            query = query.order_by(desc(order_by))
        else:
            query = query.order_by(order_by)
    return query


def bad_request(message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response
