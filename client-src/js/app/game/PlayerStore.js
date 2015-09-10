var Dispatcher = require('../../modules/Dispatcher');
var ItemsConstants = require('./ItemsConstants');
var PlayersConstants = require('./PlayerConstants');
var RegisteredStore = require('../../modules/RegisteredStore');
var Immutable = require('../../modules/immutable');
var Definitions = require('../../../../config/Definitions');
var _ = require('lodash');

var ItemsStore = RegisteredStore.create('ItemsStore');

var data = {
    generatedMap:false,
    timeElapsed:0,
    lost:false
};

/**
 * Save the player's data to browser's local storage and trigger store change
 */
function persistAndEmitChange(){
    localStorage.setItem('player',JSON.stringify(data.items.values));
    ItemsStore.emitChange();
}

/**
 * Update the items in the store, optionally don't prune items
 * @param payload Object
 * @param [mergeOnly] Boolean Pass true to prevent the deletion of items not present in the payload
 */
function updateAllItems(payload,mergeOnly){
    var transaction = data.items.transaction();
    var ids = [];
    payload.arguments.items.forEach(function(item){
        ids.push(item.id);
        transaction.addOrUpdate(item.id,item);
    });

    if(!mergeOnly){
        transaction.removeWhere(function(id){
            return ids.indexOf(id) === -1;
        });
    }

    data.items = transaction.commit();
}

function _dispatcher(payload){
    switch(payload.actionType){
        case ItemsConstants.REVEAL_ALL_ITEMS:
            ItemsStore.emitChange();
            break;
    }

    return true;
}

module.exports = ItemsStore.assign({
    getDebugData:function(){
        return data;
    },
    hasFetched:function(){
        return data.hasFetched;
    },
    getResource:function(type){
        return data[type];
    },
    dispatcherIndex:Dispatcher.register(_dispatcher)
});
