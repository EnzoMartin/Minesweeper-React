var Dispatcher = require('../../modules/Dispatcher');
var ItemsConstants = require('./ItemsConstants');
var PlayersConstants = require('./PlayerConstants');
var RegisteredStore = require('../../modules/RegisteredStore');
var Immutable = require('../../modules/immutable');

var PlayerStore = RegisteredStore.create('PlayerStore');

var data = {
    generatedMap:false,
    timeElapsed:0,
    isGameOver:false,
    hasWon:false,
    options:new Immutable.Model()
};

/**
 * Save the player's data to browser's local storage and trigger store change
 */
function persistAndEmitChange(){
    localStorage.setItem('player',JSON.stringify(data.values));
    PlayerStore.emitChange();
}

function _dispatcher(payload){
    switch(payload.actionType){
        case ItemsConstants.END_GENERATE_MAP_SUCCESS:
            data.isGameOver = false;
            data.options = payload.arguments.options;
            persistAndEmitChange();
            break;
        case ItemsConstants.REVEAL_ALL_ITEMS:
            data.isGameOver = true;
            persistAndEmitChange();
            break;
        case PlayersConstants.GAME_OVER:
            data.isGameOver = true;
            data.hasWon = payload.arguments.won;
            persistAndEmitChange();
    }

    return true;
}

module.exports = PlayerStore.assign({
    getDebugData:function(){
        return data;
    },
    getOptions:function(){
        return data.options;
    },
    hasWon: function(){
        return data.hasWon;
    },
    isGameOver: function(){
        return data.isGameOver;
    },
    dispatcherIndex:Dispatcher.register(_dispatcher)
});
