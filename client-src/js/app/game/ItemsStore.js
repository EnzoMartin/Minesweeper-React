var Dispatcher = require('../../modules/Dispatcher');
var ItemsConstants = require('./ItemsConstants');
var ItemsModelFactories = require('./ItemsModelFactories');
var PlayersConstants = require('./PlayerConstants');
var RegisteredStore = require('../../modules/RegisteredStore');
var Immutable = require('../../modules/immutable');

var ItemsStore = RegisteredStore.create('ItemsStore');

var saveTimeout;

var data = {
    isFetching:false,
    remaining:0,
    map:Immutable.List(),
    flags:[],
    items:Immutable.Dictionary()
};

/**
 * Save all items to browser's local storage and trigger store change
 */
function persistAndEmitChange(){
    if(saveTimeout){
        window.clearTimeout(saveTimeout);
    }

    saveTimeout = window.setTimeout(function(){
        localStorage.setItem('items',JSON.stringify(data.items.values));
    },1000);

    ItemsStore.emitChange();
}

/**
 * Update the data in the store
 * @param payload Object
 */
function updateAllItems(payload){
    var flags = [];
    var remaining = 0;
    var transaction = data.items.transaction();
    payload.arguments.items.forEach(function(item){
        if(item.isFlag){
            flags.push(item);
        }

        if(!item.isRevealed && !item.isBomb){
            remaining++;
        }

        transaction.addOrUpdate(item.id,item);
    });

    data.flags = flags;
    data.remaining = remaining;
    data.items = transaction.commit();
}

function updateFlaggedItem(item){
    var found = false;
    var i = 0;
    var len = data.flags.length;
    while(i < len){
        if(data.flags[i].id == item.id){
            found = true;
            break;
        }
        i++;
    }

    if(item.isFlag && !found){
        data.flags.push(item);
    } else if(!item.isFlag && found){
        data.flags.splice(i,1);
    }

    var transaction = data.items.transaction();
    transaction.update(item.id,item);
    data.items = transaction.commit();
}

function buildMap(){
    data.map = data.map.transaction().clear().commit();
    data.items.forEach(function(item){
        var mapTransaction = data.map.transaction();
        var row = data.map.index(item.row);

        if(!row){
            row = Immutable.List();
            mapTransaction.add(item.row,row);
        }

        var transaction = row.transaction();
        transaction.add(item.col,item);
        row = transaction.commit();

        mapTransaction.update(item.row,row);
        data.map = mapTransaction.commit();
    });
}

/**
 * Update the map with the new item
 * @param item {ItemModel|Object}
 */
function updateMapItem(item){
    var row = data.map.index(item.row);

    var transaction = row.transaction();
    transaction.update(item.col,item);
    row = transaction.commit();

    data.map = data.map.transaction().update(item.row,row).commit();
}

function revealNeighbors(item){
    item.neighbors.forEach(function(id){
        var item = data.items.index(id);
        if(!item.isBomb && !item.isFlag && !item.isRevealed){
            revealItem(item);
        }
    });
}

function revealItem(item){
    var updatedItem = item.transaction().set('isRevealed',true).commit();

    var transaction = data.items.transaction();
    transaction.update(updatedItem.id,updatedItem);
    data.items = transaction.commit();
    data.remaining--;
    updateMapItem(updatedItem);
    persistAndEmitChange();

    if(!updatedItem.label){
        revealNeighbors(updatedItem);
    }
}

function revealAllItems(){
    var transaction = data.items.transaction();
    data.items.forEach(function(item){
        if(!item.isRevealed){
            var model = item.shallowClone();
            model.isRevealed = true;
            model.isFlag = false;
            transaction.update(item.id,new ItemsModelFactories.ItemModel(model))
        }
    });
    data.items = transaction.commit();

    buildMap();
}

function _dispatcher(payload){
    switch(payload.actionType){
        case ItemsConstants.BEGIN_GENERATE_MAP:
            data.isFetching = true;
            ItemsStore.emitChange();
            break;
        case ItemsConstants.END_GENERATE_MAP_SUCCESS:
            data.isFetching = false;
            data.items = data.items.transaction().clear().commit();
            updateAllItems(payload);
            buildMap();
            data.hasFetched = true;
            persistAndEmitChange();
            break;
        case ItemsConstants.END_GENERATE_MAP_FAILURE:
            data.isFetching = false;
            data.hasFetched = true;
            ItemsStore.emitChange();
            break;
        case ItemsConstants.REVEAL_ALL_ITEMS:
        case PlayersConstants.GAME_OVER:
            revealAllItems();
            persistAndEmitChange();
            break;
        case ItemsConstants.REVEAL_ITEM:
            revealItem(payload.arguments.items[0]);
            break;
        case ItemsConstants.TOGGLE_ITEM_FLAG:
            updateFlaggedItem(payload.arguments.items[0]);
            updateMapItem(payload.arguments.items[0]);
            persistAndEmitChange();
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
    getRemaining:function(){
        return data.remaining;
    },
    getFlags:function(){
        return data.flags;
    },
    getById:function(id){
        return data.items.index(id);
    },
    dispatcherIndex:Dispatcher.register(_dispatcher)
});
