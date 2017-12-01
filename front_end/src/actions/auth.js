// This file handles data manipulation

var user = {
    id: null,
    name: null,
    email: null
}

export default window.auth = {
    login: (email, password, callback) => {
        fetch('http://localhost:5000/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
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

    register: (email, name, password, callback) => {
        fetch('http://localhost:5000/user', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            callback(res)
        })
    },

    getSavedUser: (callback) => {
        let localStorageUser = localStorage.getItem('user')
        if (localStorageUser) {
            user = JSON.parse(localStorageUser)
            console.log('[Auth] Retrieved user from last session', user)
            callback(user)
        }
    },

    getUser: () => {
        return user
    },
    logout: () => {
        localStorage.removeItem('user')
        window.location.reload()
    },
}