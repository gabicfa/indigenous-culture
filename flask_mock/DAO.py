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

def get_products(conn, filters):
    query = '''
            SELECT p.id, p.name, p.price, t.id, t.name, c.id, c.name 
            FROM Product p, Product_Category pc, Product_Tribe pt, Tribe t, Category c
            WHERE p.id = pt.id_product AND
            t.id = pt.id_tribe AND
            p.id = pc.id_product AND
            c.id = pc.id_category
            '''
    args = []
    if len(filters["tribe"]) != 0:
        query += 'AND t.name IN('
        for i in range(len(filters["tribe"]) - 1):
            query +=  '%s, '
        query +=  '%s'
        query += ')'
        args.extend(filters["tribe"])

    if len(filters["category"]) != 0:
        query += ' AND c.name IN('
        for i in range(len(filters["category"]) - 1):
            query +=  '%s, '
        query +=  '%s'
        query += ')'
        args.extend(filters["category"])

    if len(filters["tribe"]) != 0 or len(filters["category"]) != 0:
        print(query)
        products = conn.runall(query, (args))
    else:
        query += " LIMIT 30"
        products = conn.runall(query)

    print(query)

    product_list = []
    print(products)
    for i in range(len(products)):
        p = {}
        p["product_id"] = products[i][0]
        p["product_name"] = products[i][1]
        p["product_price"] = products[i][2]
        p["tribe_id"] = products[i][3]
        p["tribe_name"] = products[i][4]
        p["category_id"] = products[i][5]
        p["category_name"] = products[i][6]
        product_list.append(p)
    return {"products": product_list}

def get_tribes(conn):
    query = '''
            SELECT t.name
            FROM Tribe t
            '''
    tribes = conn.runall(query)
    return tribes

def get_category(conn):
    query = '''
            SELECT c.name
            FROM Category c
            '''
    category = conn.runall(query)
    return category
