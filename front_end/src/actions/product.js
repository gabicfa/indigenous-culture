
export default window.product = {

    getProducts: (callback) => {
        fetch('http://localhost:5000/products/', {
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
                        // product_description: product_item['product_description'],                        
                        product_price: product_item['product_price'],
                    }
                    product_list.push(product);
                })
            })
            }
            callback(product_list)
        })
    },

    getRecomendedProducts: (user_id, callback) => {
        fetch('http://localhost:5000/products/' + user_id, {
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