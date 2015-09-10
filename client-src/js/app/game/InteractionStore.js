var Dispatcher = require('../../modules/Dispatcher');
var ItemsConstants = require('./ItemsConstants');
var PlayersConstants = require('./PlayerConstants');
var RegisteredStore = require('../../modules/RegisteredStore');
var Immutable = require('../../modules/immutable');
var _ = require('lodash');

var InteractionStore = RegisteredStore.create('InteractionStore');

// TODO: store if SHIFT ALT CTRL are currently being held down
var data = {
    left:0,
    top:0,
    isFocused: true
};

function _dispatcher(payload){
    switch(payload.actionType){
        case PlayersConstants.PLAYER_MOUSE_LEAVE:
            data.isFocused = false;
            break;
        case PlayersConstants.PLAYER_MOUSE_ENTER:
            data.isFocused = true;
            break;
        case PlayersConstants.PLAYER_MOUSE_MOVE:
            data.left = payload.arguments.x;
            data.top = payload.arguments.y;
            InteractionStore.emitChange();
            break;
    }

    return true;
}

module.exports = InteractionStore.assign({
    getDebugData:function(){
        return data;
    },
    isFocused:function(){
        return data.isFocused;
    },
    getMouseLocation:function(){
        return {left:data.left,top:data.top};
    },
    getMouseX:function(){
        return data.left;
    },
    getMouseY:function(){
        return data.top;
    },
    dispatcherIndex:Dispatcher.register(_dispatcher)
});
