var ItemsConstants = require('./ItemsConstants');
var PlayerConstants = require('./PlayerConstants');
var ItemsModelFactory = require('./ItemsModelFactories');
var Dispatcher = require('../../modules/Dispatcher');

module.exports = {
    playerSelectedItemPlacer: function(item){
        Dispatcher.dispatch({
            actionType: PlayerConstants.BEGIN_PLAYER_PLACE_ITEM,
            arguments: {
                ghost: ItemsModelFactory.createGhost(item)
            }
        });
    },
    playerSelectedTool: function(item){
        Dispatcher.dispatch({
            actionType: PlayerConstants.BEGIN_PLAYER_USE_TOOL,
            arguments: {
                tool: ItemsModelFactory.createTool(item)
            }
        });
    },
    playerDeleteItem: function(id){
        Dispatcher.dispatch({
            actionType: PlayerConstants.END_PLAYER_DELETE_ITEM_SUCCESS,
            arguments: {
                id: id
            }
        });
    },
    playerPlacedItem: function(item){
        Dispatcher.dispatch({
            actionType: PlayerConstants.END_PLAYER_PLACE_ITEM_SUCCESS,
            arguments: {
                items: [new ItemsModelFactory.ItemModel(item)]
            }
        });
    },
    mouseEnter: function(x,y){
        Dispatcher.dispatch({
            actionType: PlayerConstants.PLAYER_MOUSE_ENTER,
            arguments: {
                x: x,
                y: y
            }
        });
        this.mouseMove(x,y);
    },
    mouseLeave: function(x,y){
        Dispatcher.dispatch({
            actionType: PlayerConstants.PLAYER_MOUSE_LEAVE,
            arguments: {
                x: x,
                y: y
            }
        });
        this.mouseMove(x,y);
    },
    mouseMove: function(x,y){
        Dispatcher.dispatch({
            actionType: PlayerConstants.PLAYER_MOUSE_MOVE,
            arguments: {
                x: x,
                y: y
            }
        });
    },
    keyPress: function(key,shift,ctrl){
        Dispatcher.dispatch({
            actionType: PlayerConstants.PLAYER_KEY_PRESS,
            arguments: {
                key: key,
                shift: shift,
                ctrl: ctrl
            }
        });
    },
    keyDown: function(key,shift,ctrl){
        Dispatcher.dispatch({
            actionType: PlayerConstants.PLAYER_KEY_DOWN,
            arguments: {
                key: key,
                shift: shift,
                ctrl: ctrl
            }
        });
    },
    keyUp: function(key,shift,ctrl){
        Dispatcher.dispatch({
            actionType: PlayerConstants.PLAYER_KEY_UP,
            arguments: {
                key: key,
                shift: shift,
                ctrl: ctrl
            }
        });
    }
};