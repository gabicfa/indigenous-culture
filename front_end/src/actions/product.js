
export default window.product = {

    getProducts: (callback) => {
        fetch('http://localhost:5000/products', {
            method: 'GET',
        }).then((response) => {
            if (response.status == 200){
                response.json().then((data) => {callback(data)})
            }                                                    
        })
    },

    getFilteredProducts: (filter, callback) => {

        fetch('http://localhost:5000/products', {
            method: 'POST',
            body: JSON.stringify({
                filter: {tribe: filter},
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status == 200){
                response.json().then((data) => {callback(data)})
            }                                                    
        })
    },

    getRecomendedProducts: (user_id, callback) => {
        fetch('http://localhost:5000/r_products', {
            method: 'GET',
        }).then((response) => {
            var product_list = []
            if(response.status === 200){
                let data = response.json().then((data) => {
                data['products'].forEach(function (product_item) {
                    var product = {
                        product_id: product_item['product_id'],
                        product_name: product_item['product_name'],
                        product_tribe: product_item['product_tribe'],
                        price: product_item['product_price'],
                    }
                    product_list.push(product);
                })
            })
            }
            callback(product_list)
        })
    }
}