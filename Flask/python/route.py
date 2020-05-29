from flask_cors import CORS, cross_origin
from python._init_ import app, db
from python.model import *
from flask import request, jsonify
import json

# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/get_users', methods = ['get'])
@cross_origin()
def get_users():
    all_users = users.query.all()
    data = list()
    details = {}
    for user in all_users:
        details = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'password': user.password
        }
        data.append(details)
    return jsonify({'status': 'success', 'data': data})

@app.route('/insert_user', methods = ['get', 'post'])
@cross_origin()
def insert_user():
    data = request.data
    data_dict = json.loads(data)
    print(data_dict)
    obj = users(first_name = data_dict['first_name'], last_name = data_dict['last_name'], email = data_dict['email'], password = data_dict['password'])
    db.session.add(obj)
    db.session.commit()
    return '200'

@app.route('/get_user/<id>', methods = ['get', 'post'])
@cross_origin()
def get_user(id):
    user = users.query.get(id)
    data = list()
    details = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'password': user.password
    }
    return jsonify({'status': 'success', 'data': details})

@app.route('/edit_user/<id>', methods = ['get', 'put'])
@cross_origin()
def edit_user(id):
    data = request.data
    data_dict = json.loads(data)
    user = users.query.get(id)
    user.first_name = data_dict['first_name']
    user.last_name = data_dict['last_name']
    user.email = data_dict['email']
    user.password = data_dict['password']
    db.session.commit()
    return jsonify({'status': 'succcess'})

@app.route('/delete_user/<id>', methods = ['get','delete'])
@cross_origin()
def delete_user(id):
    users.query.filter_by(id = id).delete()
    db.session.commit()
    return jsonify({'status': 'succcess'})