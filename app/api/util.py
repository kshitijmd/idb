from flask import jsonify, request
from sqlalchemy import desc
from sqlalchemy import func


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
        'page': pagination.page,
        'pages': pagination.pages,
        'next': pagination.next_num,
        'prev': pagination.prev_num,
        'per_page': pagination.per_page,
        data_name: [serialize(datum) for datum in pagination.items]
    })


def single_response(model, id):
    result = model.query.filter(model.id == id).first()
    if not result:
        response = jsonify({"message": "Item not found."})
        response.status_code = 400
        return response
    return jsonify(serialize(result))


def filter_query(query, model):
    filter_by = request.args.get('filter_by')
    if not filter_by:
        return query
    if filter_by not in (m.key for m in model.__table__.columns):
        return bad_request('Invalid filter_by argument.')

    include = request.args.get('include')
    if include:
        include = include.split(',')
        for item in include:
            query = query.filter(func.lower(
                getattr(model, filter_by)) == func.lower(item))

    exclude = request.args.get('exclude')
    if exclude:
        exclude = exclude.split(',')
        for item in exclude:
            query = query.filter(func.lower(
                getattr(model, filter_by)) != func.lower(item))

    like = request.args.get('like')
    if like:
        like = like.split(',')
        for item in like:
            query = query.filter(
                getattr(model, filter_by).ilike('%' + item + '%'))

    notlike = request.args.get('notlike')
    if notlike:
        notlike = notlike.split(',')
        for item in notlike:
            query = query.filter(
                ~getattr(model, filter_by).ilike('%' + item + '%'))

    return query


def order_query(query, model):
    order_by = request.args.get('order_by')
    if order_by:
        if order_by not in (m.key for m in model.__table__.columns):
            return bad_request('Invalid order_by argument.')
        if request.args.get('desc') == "true":
            query = query.order_by(desc(order_by))
        else:
            query = query.order_by(order_by)
    return query


def bad_request(message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response
