var Dispatcher = require('../../modules/Dispatcher');
var ItemsConstants = require('./ItemsConstants');
var PlayersConstants = require('./PlayerConstants');
var RegisteredStore = require('../../modules/RegisteredStore');
var Immutable = require('../../modules/immutable');
var Definitions = require('../../../../config/Definitions');
var _ = require('lodash');

var ItemsStore = RegisteredStore.create('ItemsStore');

var data = {
    isFetching:false,
    map:[[]],
    items:Immutable.Dictionary(),
    options:new Immutable.Model()
};

/**
 * Save all items to browser's local storage and trigger store change
 */
function persistAndEmitChange(){
    localStorage.setItem('items',JSON.stringify(data.items.values));
    ItemsStore.emitChange();
}

/**
 * Update the data in the store, optionally don't prune items
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
    buildMap();
}

function buildMap(){
    data.map = data.items.reduce(function(items,item){
        items[item.row] = items[item.row] || [];
        items[item.row][item.col] = item;

        return items;
    },[]);
}

/**
 * Removes items not in payload that are relevant to the payload's items, then calls updateAllItems with a merge only
 * @param payload Object
 */
function updateSomeItems(payload){
    var transaction = data.items.transaction();
    var ids = payload.arguments.items.reduce(function(ids,item){
        ids.push(item.id);
        return ids;
    },[]);

    transaction.removeWhere(function(id,item){
        return ids.indexOf(item.id) !== -1;
    });

    data.items = transaction.commit();
    updateAllItems(payload,true);
}

/**
 * Delete by the given ID
 * @param payload
 */
function deleteById(payload){
    var transaction = data.items.transaction();
    transaction.remove(payload.arguments.id);
    data.items = transaction.commit();
}

function _dispatcher(payload){
    switch(payload.actionType){
        case ItemsConstants.BEGIN_GENERATE_MAP:
            data.isFetching = true;
            ItemsStore.emitChange();
            break;
        case ItemsConstants.END_GENERATE_MAP_SUCCESS:
            data.isFetching = false;
            data.options = payload.arguments.options;
            updateAllItems(payload);
            data.hasFetched = true;
            persistAndEmitChange();
            break;
        case ItemsConstants.END_GENERATE_MAP_FAILURE:
            data.isFetching = false;
            data.hasFetched = true;
            ItemsStore.emitChange();
            break;
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
    isFetching:function(){
        return data.isFetching;
    },
    hasFetched:function(){
        return data.hasFetched;
    },
    getItems:function(){
        return data.items;
    },
    getMap:function(){
        return data.map;
    },
    getOptions:function(){
        return data.options;
    },
    getById:function(id){
        return data.items.index(id);
    },
    getGhost:function(){
        return data.ghost;
    },
    getTool:function(){
        return data.tool;
    },
    dispatcherIndex:Dispatcher.register(_dispatcher)
});