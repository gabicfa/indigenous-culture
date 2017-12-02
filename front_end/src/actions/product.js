
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

    getRecommendedTribe: (user_id, callback) => {
        fetch('http://localhost:5000/r_tribe/' + user_id, {
            method: 'GET',
        }).then((response) => {
            if (response.status == 200){
                response.json().then((data) => {callback(data)})
            }                                                    
        })
    },

    getFilteredProducts: (tribe, category, callback) => {
        fetch('http://localhost:5000/products', {
            method: 'POST',
            body: JSON.stringify({
                filter: {tribe: tribe, category: category},
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

    getRecommendedMost: (user_id,callback) => {
        fetch('http://localhost:5000/most_purchased', {
            method: 'GET',
        }).then((response) => {
            if (response.status == 200){
                response.json().then((data) => {callback(data)})
            }                                                    
        })
    },
    getRecommendedByProduct: (user_id,callback) => {
        fetch('http://localhost:5000/r_products/'+user_id, {
            method: 'GET',
        }).then((response) => {
            if (response.status == 200){
                response.json().then((data) => {callback(data)})
            }                                                    
        })
    },
    getRecommendedByCategory: (user_id,callback) => {
        fetch('http://localhost:5000/r_categories/'+user_id, {
            method: 'GET',
        }).then((response) => {
            if (response.status == 200){
                response.json().then((data) => {callback(data)})
            }                                                    
        })
    },

        declareInterest: (user_id, product_id, category_id, tribe_id, callback) => {
            fetch('http://localhost:5000/di', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: user_id,
                    product_id: product_id,
                    category_id:category_id,
                    tribe_id:tribe_id
                }),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST',
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                callback(res)
            }).catch(err => err);
        },
}