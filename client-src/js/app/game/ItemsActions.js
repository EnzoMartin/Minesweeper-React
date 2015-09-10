var ItemsConstants = require('./ItemsConstants');
var ItemsModelFactories = require('./ItemsModelFactories');
var Definitions = require('../../../../config/Definitions');
var Dispatcher = require('../../modules/Dispatcher');
var _ = require('lodash');

module.exports = {
    /**
     * Generate the map
     * @param width Number
     * @param height Number
     * @param difficulty Number
     */
    generateMap: function(width,height,difficulty){
        Dispatcher.dispatch({
            actionType: ItemsConstants.BEGIN_GENERATE_MAP
        });

        // Get the player's placed items from previous session
        /*var items = localStorage.getItem('items');
        items = items? JSON.parse(items) : [];*/


        Dispatcher.dispatch({
            actionType: ItemsConstants.END_GENERATE_MAP_SUCCESS,
            arguments: ItemsModelFactories.generateGame(width,height,difficulty)
        });
    },
    toggleFlag: function(item){
        var model = item.shallowClone();
        model.isFlag = !model.isFlag;

        Dispatcher.dispatch({
            actionType: ItemsConstants.TOGGLE_ITEM_FLAG,
            arguments: {
                items: [new ItemsModelFactories.ItemModel(model)]
            }
        });
    },
    revealItem: function(item){
        Dispatcher.dispatch({
            actionType: ItemsConstants.REVEAL_ITEM,
            arguments: {
                items: [item]
            }
        });
    },
    revealAllItems: function(){
        Dispatcher.dispatch({
            actionType: ItemsConstants.REVEAL_ALL_ITEMS
        });
    }
};