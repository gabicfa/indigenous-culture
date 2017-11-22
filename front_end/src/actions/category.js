const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter();
emitter.setMaxListeners(20)

export default window.category = {

    getCategory: (callback) => {
        fetch('http://localhost:5000/category', {
            method: 'GET',
        }).then((response) => {
            if (response.status == 200){
                response.json().then((data) => {callback(data)})
            }                                                    
        })
    },

    emitValue: (label,value) => {
        emitter.emit(label+'_update', value);
    },

    subscribe: (storeName, callback) => {
        emitter.addListener(`${storeName}_update`, callback)
    },

    unsubscribe: (storeName, callback) => {
        emitter.removeListener(`${storeName}_update`, callback)
    },
}