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
            FROM Product p, Product_Category pc, Product_Tribe pt, Tribe t, Category c
            WHERE p.id = pt.id_product AND
            t.id = pt.id_tribe AND
            p.id = pc.id_product AND
            c.id = pc.id_category
            '''
    products = [list(conn.run(query))]
    product_list = []
    print(products)
    p = {}
    for i in range(len(products)):
        p["product_id"] = products[i][0]
        p["product_name"] = products[i][1]
        p["product_price"] = products[i][2]
        p["tribe_id"] = products[i][3]
        p["tribe_name"] = products[i][4]
        p["category_id"] = products[i][5]
        p["category_name"] = products[i][6]
        product_list.append(p)
    return {"products": product_list}