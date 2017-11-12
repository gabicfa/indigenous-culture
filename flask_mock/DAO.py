def create_user(conn, name, password, email):
    query = "INSERT INTO User(name, password, email)" +\
            "VALUES (%s, %s, %s)"
    args = (name, password, email)
    conn.run(query, args)

def get_user(conn, name):
    user = {}
    query = 'SELECT * FROM User WHERE name=%s'
    ans = conn.run(query, name)
    user["id"] = ans[0]
    user["name"] = ans[1]
    user["password"] = ans[2]
    user["email"] = ans[3]
    return user

def get_products(conn):
    query = '''
            SELECT p.id, p.name, p.price, t.id, t.name, c.id, c.name 
            FROM Product p, Product_Category pc, Product_Tribe pt 
            JOIN Tribe t ON p.id = pt.id_product AND t.id = pt.id_tribe
            JOIN Category c ON p.id = pc.id_product AND c.id = pc.id_category
            LIMIT 30
            '''
    products = conn.run(query)
    product_list = []
    p = {}
    for product in products:
        p["product_id"] = product[0]
        p["product_name"] = product[1]
        p["product_price"] = product[2]
        p["tribe_id"] = product[3]
        p["tribe_name"] = product[4]
        p["category_id"] = product[5]
        p["category_name"] = product[6]
        product_list.append(p)
    return {"products": product_list}