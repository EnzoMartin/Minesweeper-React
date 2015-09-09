function CacheStrategy(data) {
    this.getItem = data.getItem || function() { };
    this.setItem = data.setItem || function() { };
    this.removeItem = data.removeItem || function() { };
    this.registerChangeHandler = data.registerChangeHandler || function() { };
}

module.exports = {
    create: function(data) {
        return new CacheStrategy(data);
    }
};