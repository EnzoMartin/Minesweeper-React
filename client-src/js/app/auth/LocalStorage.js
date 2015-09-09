module.exports = {
    /**
     * Save passed in object to localStorage
     * @param data Object
     */
    saveToLocal: function(data){
        Object.keys(data).forEach(function(key){
            localStorage.setItem(key,data[key]);
        });
    },
    /**
     * Get 1 or more keys from localstorage
     * @param keys String|Array
     * @returns Object
     */
    getFromLocal: function(keys){
        keys = typeof keys === 'String'? [keys] : keys;
        var data = {};
        keys.forEach(function(key){
            data[key] = localStorage.getItem(key);
        });

        return data;
    },
    /**
     * Get all items from localStorage
     * @returns Object
     */
    getAllFromLocal: function(){
        var data = {};
        for (var i = 0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }

        return data;
    }
};