from flask import Flask, jsonify, request
from json import dumps
import DAO as dao
import recommend
from connection_helper import ConnectionHelper
# import atexit
# from apscheduler.schedulers.background import BackgroundScheduler
# from apscheduler.triggers.interval import IntervalTrigger
# from multiprocessing.pool import ThreadPool


# # Global var Recommendations
# data_recommend_tribe = None
# df_tribe = None
# data_recommend_prod = None
# df_prod = None

# def update_recommendation():
#     conn = ConnectionHelper()
#     table, labels = dao.get_recommended_tribe_table(conn)
#     df_tribe, data_recommend_tribe = recommend.get_recommended_item(table, labels)
#     table, labels = dao.get_recommended_products_table(conn)
#     df_prod, data_recommend_prod = recommend.get_recommended_item(table, labels)
#     return df_prod, data_recommend_prod, df_tribe, data_recommend_tribe

# def call_update_thread():
#     print("updated_period_begin")
#     global data_recommend_tribe, df_tribe, data_recommend_prod, df_prod        
#     pool = ThreadPool(processes=1)
#     async_result = pool.apply_async(update_recommendation)
#     df_prod, data_recommend_prod, df_tribe, data_recommend_tribe = async_result.get()
#     print("updated_period")
    
def create_app():
    app = Flask(__name__)
    def run_on_start(*args, **argv):
        print("starting")
    run_on_start()
    return app
app = create_app()

# # Scheduler 
# scheduler = BackgroundScheduler()
# scheduler.start()
# scheduler.add_job(
#     func=call_update_thread,
#     trigger=IntervalTrigger(seconds=30),
#     id='update recommendation',
#     name='Update recommendation every 1.5 min',
#     replace_existing=True)
# # Shut down the scheduler when exiting the app
# atexit.register(lambda: scheduler.shutdown())

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
    user_db = dao.create_user(conn, user['name'], user['password'], user['email'])
    res = {'user': {
                "id": user_db["id"],
                "name": user_db["name"],
                "email": user_db["email"],
                }}
    return dumps(res), 200

@app.route('/user/login', methods=['POST'])
def user_login():
    if request.method == 'POST':
        request_json = request.get_json()
        user = {}
        user['email'] = request_json['email']
        user['password'] = request_json['password']
        conn = ConnectionHelper()
        user_db = dao.get_user(conn, user['email'])
        if user:
            if user['password'] == user_db["password"]:
                res = {'user': {
                            "id": user_db["id"],
                            'name': user_db["name"],
                            "email": user_db["email"],
                            }}
                return dumps(res), 200

        return 'Not acceptable', 406

@app.route('/products', methods=['POST'])
def get_products():
    if request.method == 'POST':
        request_json = request.get_json()
        filters = request_json["filter"]
        conn = ConnectionHelper()
        products = dao.get_products(conn, filters)
        return dumps(products), 200

@app.route('/tribes', methods=['GET'])
def get_tribes():
    if request.method == 'GET':
        conn = ConnectionHelper()
        tribes = dao.get_tribes(conn)
        print(tribes)
        return dumps(tribes), 200

@app.route('/category', methods=['GET'])
def get_category():
    if request.method == 'GET':
        conn = ConnectionHelper()
        category = dao.get_category(conn)
        return dumps(category), 200

@app.route('/r_categories/<int:user_id>', methods=['GET'])
def get_recommended_product_by_category(user_id):
    if request.method == 'GET':
        conn = ConnectionHelper()
        table, labels = dao.get_recommended_category_table(conn)
        recommended_item_id = recommend.get_recommended_item(user_id,table, labels)
        recommended_product = dao.get_product_by_category_id(conn, recommended_item_id)
        return dumps(recommended_product), 200

@app.route('/r_products/<int:user_id>', methods=['GET'])
def get_recommended_product_by_product(user_id):
    if request.method == 'GET':
        conn = ConnectionHelper()
        table, labels = dao.get_recommended_products_table(conn)
        recommended_item_id = recommend.get_recommended_item(user_id,table, labels)
        recommended_product = dao.get_product_by_product_id(conn, recommended_item_id)
        return dumps(recommended_product), 200

@app.route('/most_purchased', methods=['GET'])
def get_most_purchased(user_id):
    if request.method == 'GET':
        conn = ConnectionHelper()
        table, labels = dao.get_recommended_products_table(conn)
        purchases_list = []
        total = 0
        for column in range(1,len(table[0])):
            for row in range(len(table)):
                total += table[row][column]
            purchases_list.append(total)
        purchase_number = max(purchases_list)
        labels.delete(0)
        recommended_item_id = labels[purchases_list.index(purchase_number)]
        recommended_product = dao.get_product_by_product_id(conn, recommended_item_id)
        return dumps(recommended_product), 200

@app.route('/r_tribe/<int:user_id>', methods=['GET'])
def get_recommended_tribe(user_id):
    if request.method == 'GET':
        global data_recommend_tribe, df_tribe
        conn = ConnectionHelper()
        table, labels = dao.get_recommended_tribe_table(conn)
        recommended_item_id = recommend.get_recommended_item(user_id,table, labels)
        recommended_tribe = dao.get_tribe_by_id(conn, recommended_item_id)
        return dumps(recommended_tribe), 200

@app.route('/di', methods=['POST'])
def declare_interest():
    if request.method == 'POST':
        request_json = request.get_json()
        conn = ConnectionHelper()
        interest = {}
        interest['user_id'] = request_json['user_id']
        interest['product_id'] = request_json['product_id']
        interest['category_id'] = request_json['category_id']
        interest['tribe_id'] = request_json['tribe_id']
        dao.declare_interest(conn, interest)
        return dumps(interest),200


if __name__ == "__main__":
    app.run()