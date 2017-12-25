from random import choice
def create_user(conn, name, password, email):
    query = "INSERT INTO User(name, password, email)" +\
            "VALUES (%s, %s, %s)"
    args = (name, password, email)
    conn.run(query, args)
    return get_user(conn, email)

def get_user(conn, email):
    user = {}
    query = 'SELECT * FROM User WHERE email=%s'
    ans = conn.run(query, email)
    user["id"] = ans[0]
    user["name"] = ans[1]
    user["password"] = ans[2]
    user["email"] = ans[3]
    return user

def get_product_by_category_id(conn, category_id):
    query = '''
            SELECT p.id, p.name, p.price, t.id, t.name, c.id, c.name, p.description
            FROM Product p, Product_Category pc, Product_Tribe pt, Tribe t, Category c
            WHERE p.id = pt.id_product AND
            t.id = pt.id_tribe AND
            p.id = pc.id_product AND
            c.id = pc.id_category AND
            c.id = %s
            '''
    allans = conn.runall(query, category_id)
    ans = choice(allans)
    p = {}
    p["product_id"] = ans[0]
    p["product_name"] = ans[1]
    p["product_price"] = ans[2]
    p["tribe_id"] = ans[3]
    p["tribe_name"] = ans[4]
    p["category_id"] = ans[5]
    p["category_name"] = ans[6]
    p["description"] = ans[7]
    return {"products": p}

def get_product_by_product_id(conn, category_id):
    query = '''
            SELECT p.id, p.name, p.price, t.id, t.name, c.id, c.name, p.description
            FROM Product p, Product_Category pc, Product_Tribe pt, Tribe t, Category c
            WHERE p.id = pt.id_product AND
            t.id = pt.id_tribe AND
            p.id = pc.id_product AND
            c.id = pc.id_category AND
            p.id = %s
            '''
    ans = conn.run(query, category_id)
    p = {}
    p["product_id"] = ans[0]
    p["product_name"] = ans[1]
    p["product_price"] = ans[2]
    p["tribe_id"] = ans[3]
    p["tribe_name"] = ans[4]
    p["category_id"] = ans[5]
    p["category_name"] = ans[6]
    p["description"] = ans[7]
    return {"products": p}

def get_tribe_by_id(conn, tribe_id):
    query = '''
            SELECT t.id, t.name, t.origin, t.state, t.description, t.extra_description
            FROM Tribe t WHERE t.id = %s
            '''
    ans = conn.run(query, tribe_id)
    p = {}
    p["tribe_id"] = ans[0]
    p["tribe_name"] = ans[1]
    p["tribe_origin"] = ans[2]
    p["tribe_state"] = ans[3]
    p["description"] = ans[4]
    p["extra_description"] = ans[5]
    return {"tribes": p}

def declare_interest(conn, interest):
    try:
        query = "INSERT INTO User_Tribe(id_user, id_tribe)" +\
                "VALUES (%s, %s)"
        args = (interest["user_id"], interest["tribe_id"])
        conn.run(query, args)
    except:
        pass
    try:
        query = "INSERT INTO User_Category(id_user, id_category)" +\
                "VALUES (%s, %s)"
        args = (interest["user_id"], interest["category_id"])
        conn.run(query, args)
    except:
        pass
    try:
        query = "INSERT INTO User_Product(id_user, id_product)" +\
                "VALUES (%s, %s)"
        args = (interest["user_id"], interest["product_id"])
        conn.run(query, args)
    except:
        pass
    return get_interest_category(conn)

def get_categories_ids(conn):
    query = 'SELECT id FROM Category'
    ans = conn.runall(query)
    return ans

def get_products_ids(conn):
    query = 'SELECT id FROM Product'
    ans = conn.runall(query)
    return ans

def get_users_ids(conn):
    query = 'SELECT id FROM User'
    ans = conn.runall(query)
    return ans

def get_tribe_ids(conn):
    query = 'SELECT id FROM Tribe'
    ans = conn.runall(query)
    return ans

def get_interest_tribe(conn):
    query = 'SELECT * FROM User_Tribe'
    ans = conn.runall(query)
    return ans

def get_interest_category(conn):
    query = 'SELECT * FROM User_Category'
    ans = conn.runall(query)
    return ans

def get_interest_product(conn):
    query = 'SELECT * FROM User_Product'
    ans = conn.runall(query)
    return ans

def get_recommended_products_table(conn):
    products = list(get_products_ids(conn))
    users = list(get_users_ids(conn))
    interest = list(get_interest_product(conn))
    products = [x[0] for x in products]
    users = [x[0] for x in users]
    final = []
    for user in users:
        final.append([0]*(len(products)))
        final[-1].insert(0,user)
    # final.insert(0, products)

    for user_id, product_id in interest:
        products_pos = products.index(product_id) + 1
        user_pos = users.index(user_id)
        final[user_pos][products_pos] = 1

    products.insert(0, "user")
    return final, products


def get_recommended_category_table(conn):
    categories = list(get_categories_ids(conn))
    users = list(get_users_ids(conn))
    interest = list(get_interest_category(conn))
    categories = [x[0] for x in categories]
    users = [x[0] for x in users]
    final = []
    for user in users:
        final.append([0]*(len(categories)))
        final[-1].insert(0,user)
    # final.insert(0, categories)

    for user_id, category_id in interest:
        category_pos = categories.index(category_id) + 1
        user_pos = users.index(user_id)
        final[user_pos][category_pos] = 1

    categories.insert(0, "user")
    return final, categories

def get_recommended_tribe_table(conn):
    tribes = list(get_tribe_ids(conn))
    users = list(get_users_ids(conn))
    interest = list(get_interest_tribe(conn))
    tribes = [x[0] for x in tribes]
    users = [x[0] for x in users]
    final = []
    for user in users:
        final.append([0]*(len(tribes)))
        final[-1].insert(0,user)
    # final.insert(0, categories)

    for user_id, tribe_id in interest:
        tribe_pos = tribes.index(tribe_id) + 1
        user_pos = users.index(user_id)
        final[user_pos][tribe_pos] = 1

    tribes.insert(0, "user")
    return final, tribes

def get_products(conn, filters):
    query = '''
            SELECT p.id, p.name, p.price, t.id, t.name, c.id, c.name, p.description, t.description, t.extra_description
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
        products = conn.runall(query, (args))
    else:
        query += " LIMIT 30"
        products = conn.runall(query)

    product_list = []
    for i in range(len(products)):
        p = {}
        p["product_id"] = products[i][0]
        p["product_name"] = products[i][1]
        p["product_price"] = products[i][2]
        p["tribe_id"] = products[i][3]
        p["tribe_name"] = products[i][4]
        p["category_id"] = products[i][5]
        p["category_name"] = products[i][6]
        p["description"] = products[i][7]
        p["tribe_description"] = products[i][8]
        p["tribe_extra_description"] = products[i][9]
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
