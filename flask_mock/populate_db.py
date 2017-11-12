from connection_helper import ConnectionHelper
from random import uniform

conn = ConnectionHelper()

def read_file_items(file_name):
    categories = {}
    dict_value = None
    value = None
    with open(file_name) as f:
        while True:
            value = f.readline().strip()
            if value == "-":
                dict_value = f.readline().strip()
                categories[dict_value] = []
            elif value == ".":
                break
            else:
                categories[dict_value].append(value)
    return categories

def read_file_indians(file_name):
    value = None
    list_indians = []
    with open(file_name) as f:
        while True:
            value = f.readline()
            if value == ".":
                break
            list_indians.append(value.strip().split("	"))
    return list_indians

def get_id_by_name(conn, table, name):
    query = 'SELECT id FROM %s WHERE name=%s'
    args = (table, name)
    return conn.run(query, args)[0]

def associate_table(conn, association_table, id_name1, id_name2, id_value1, id_value2):
    query = "INSERT INTO %s(%s, %s) " \
            "VALUES (%s, %s)"
    args = (association_table, id_name1, id_name2, id_value1, id_value2)
    conn.run(query, args)

def insert_product(conn, name, price):
    query = "INSERT INTO Product(name, price) " \
            "VALUES (%s, %s)"
    args = (name, price)
    conn.run(query, args)

def insert_category(conn, name):
    query = "INSERT INTO Category(name) " \
            "VALUES (%s)"
    args = (name)
    conn.run(query, args)

def insert_tribe(conn, name, origin, state):
    query = "INSERT INTO Category(name, origin, state) " \
            "VALUES (%s, %s, %s)"
    args = (name, origin, state)
    conn.run(query, args)

def delete_table_content(conn, delete_command):
    conn.run(delete_command)

def populate_items(conn):
    #Deleting previous content
    delete_table_content(conn,"DELETE FROM Product")
    delete_table_content(conn,"DELETE FROM Category")
    delete_table_content(conn,"DELETE FROM Tribe")
    delete_table_content(conn,"DELETE FROM Product_Category")
    delete_table_content(conn,"DELETE FROM Product_Tribe")

    categories_dict = read_file_items("indian_items.txt")
    for category in categories_dict.keys():
        insert_category(conn, category) #insert categories

    tribe_list = read_file_indians("indian_tribes.txt")
    for tribe, origin, state in tribe_list:
        insert_tribe(conn, tribe, origin, state) #insert tribes

    for category in categories_dict.keys():
        category_id = get_id_by_name(conn, "Category", category)
        for product in categories_dict[category]:
            for tribe, origin, state in tribe_list:
                product_name = str(product + " " + tribe)
                price = str(round(uniform(15.0, 100.0), 2))
                insert_product(conn,product_name, price)
                #associate
                product_id = get_id_by_name(conn, "Product", product_name)
                tribe_id = get_id_by_name(conn, "Tribe", tribe)
                associate_table(conn, "Product_Category", "id_product", "id_category", product_id, category_id)
                associate_table(conn, "Product_Tribe", "id_product", "id_tribe", product_id, tribe_id)


if __name__ == "__main__":
    populate_items(conn)