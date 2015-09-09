var _ = require('lodash');
var Store = require('./Store');
var DebugStore = require('./debug/DebugStore');
var DebugActions = require('./debug/DebugActions');

var RegisteredStore = _.assign({}, Store, {
    name: '',
    /**
     * Fetch an object of data to display on the debug output
     */
    getDebugData: function() {
        return {};
    },
    /**
     * Assign additional functionality to this store
     * @param data
     * @returns {*|void}
     */
    assign: function(data) {
        return _.assign(this, data);
    }
});

module.exports = {
    create: function(name) {
        var store = _.assign({}, RegisteredStore, {
            name: name
        });

        // If the debug store is alive this will be dispatched, if not (production) then these actions will go ignored.
        DebugActions.registerStore(name, store);

        return store;
    }
};
