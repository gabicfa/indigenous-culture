from flask import Flask, jsonify, request
from json import dumps
import DAO as dao
from connection_helper import ConnectionHelper

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'INDIAN CULTURE'

@app.route('/user', methods=['POST'])
def register():
    request_json = request.get_json()
    conn = ConnectionHelper()
    user = {}
    user['name'] = request_json['name']
    user['email'] = request_json['email']
    user['password'] = request_json['password']
    dao.create_user(conn, user['name'], user['password'], user['email'])
    return dumps({'user': {
                'id': user["id"],
                'name': user["name"],
                'password': user["password"],
                }}), 200

@app.route('/user/login', methods=['POST'])
def user_login():
    if request.method == 'POST':
        request_json = request.get_json()
        user = {}
        user['email'] = request_json['email']
        user['password'] = request_json['password']

        conn = ConnectionHelper()
        user_db = dao.get_user(conn, user['name'])
        if user:
            if user['password'] == user_db["password"]:
                return dumps({'user': {
                            'id': user_db["id"],
                            'name': user_db["name"],
                            }}), 200

        return 'Not acceptable', 406

@app.route('/products', methods=['GET'])
def get_products():
    if request.method == 'GET':
        conn = ConnectionHelper()
        products = dao.get_products(conn)
        print(products)
        return dumps(products), 200

@app.route('/r_products', methods=['GET'])
def get_recomended_products():
    if request.method == 'GET':
        conn = ConnectionHelper()
        products = dao.get_rproducts(conn)
        return products, 200
