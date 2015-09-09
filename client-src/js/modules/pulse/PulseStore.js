var RegisteredStore = require('../RegisteredStore');
var PulseStore = RegisteredStore.create('PulseStore');

var data = {
    nowInMilliseconds: 0,
    nowInSeconds: 0
};

setInterval(function() {
    data.nowInMilliseconds = Date.now();
    data.nowInSeconds = Math.ceil(data.nowInMilliseconds / 1000);

    PulseStore.emitChange();
}, 1000);

module.exports = PulseStore.assign({
    getDebugData: function(){
        return data;
    },
    /**
     * Check if the stored time is equal to zero for the modulo of the passed in seconds
     * @returns {*}
     */
    isTimeMultipleOfSeconds: function(seconds) {
        return data.nowInSeconds % seconds === 0;
    }
});
