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
    query = order_query(model.query, model)
    query = filter_query(query, model)

    pagination = query.paginate()
    return jsonify({
        'pages': pagination.pages,
        'next': pagination.next_num,
        'prev': pagination.prev_num,
        'per_page': pagination.per_page,
        data_name: [serialize(datum) for datum in pagination.items]
    })


def filter_query(query, model):
    filter_by = request.args.get('filter_by')
    if not filter_by:
        return query
    if filter_by not in (m.key for m in model.__table__.columns):
        return bad_request('Invalid filter_by argument.')

    include = request.args.get('include')
    if include:
        query = query.filter(getattr(model, filter_by) == include)

    exclude = request.args.get('exclude')
    if exclude:
        query = query.filter(getattr(model, filter_by) != exclude)

    like = request.args.get('like')
    if like:
        query = query.filter(getattr(model, filter_by).like('%' + like + '%'))

    return query


def order_query(query, model):
    order_by = request.args.get('order_by')
    if order_by and order_by not in (m.key for m in model.__table__.columns):
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
