var ItemsConstants = require('./ItemsConstants');
var ItemsModelFactories = require('./ItemsModelFactories');
var Dispatcher = require('../../modules/Dispatcher');

module.exports = {
    /**
     * Set an item as flagged
     * @param item {ItemModel}
     * @param flagged Boolean
     */
    toggleFlag: function(item,flagged){
        var model = item.transaction().set('isFlag',flagged).commit();

        Dispatcher.dispatch({
            actionType: ItemsConstants.TOGGLE_ITEM_FLAG,
            arguments: {
                items: [model]
            }
        });
    },
    /**
     * Reveal an item
     * @param item {ItemModel}
     */
    revealItem: function(item){
        Dispatcher.dispatch({
            actionType: ItemsConstants.REVEAL_ITEM,
            arguments: {
                items: [item]
            }
        });
    },
    /**
     * Reveal all items
     */
    revealAllItems: function(){
        Dispatcher.dispatch({
            actionType: ItemsConstants.REVEAL_ALL_ITEMS
        });
    }
};