var Dispatcher = require('../../modules/Dispatcher');
var ItemsConstants = require('./ItemsConstants');
var ItemsModelFactories = require('./ItemsModelFactories');
var PlayersConstants = require('./PlayerConstants');
var RegisteredStore = require('../../modules/RegisteredStore');
var Immutable = require('../../modules/immutable');
var Definitions = require('../../../../config/Definitions');
var _ = require('lodash');

var ItemsStore = RegisteredStore.create('ItemsStore');

var data = {
    isFetching:false,
    map:[[]],
    flags:[],
    items:Immutable.Dictionary()
};

/**
 * Save all items to browser's local storage and trigger store change
 */
function persistAndEmitChange(){
    localStorage.setItem('items',JSON.stringify(data.items.values));
    localStorage.setItem('map',JSON.stringify(data.map));
    localStorage.setItem('flags',JSON.stringify(data.flags));
    ItemsStore.emitChange();
}

/**
 * Update the data in the store
 * @param payload Object
 */
function updateAllItems(payload){
    var flags = [];
    var transaction = data.items.transaction();
    payload.arguments.items.forEach(function(item){
        if(item.isFlag){
            flags.push(item);
        }

        transaction.addOrUpdate(item.id,item);
    });

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

function revealNeighbors(item){
    item.neighbors.forEach(function(id){
        var item = data.items.index(id);
        if(!item.isBomb && !item.isFlag && !item.isRevealed){
            revealItem(item);
        }
    });
}

function revealItem(item){
    var model = item.shallowClone();
    model.isRevealed = true;

    var transaction = data.items.transaction();
    transaction.addOrUpdate(item.id,new ItemsModelFactories.ItemModel(model));
    data.items = transaction.commit();

    buildMap();
    ItemsStore.emitChange();

    if(!item.label){
        revealNeighbors(item);
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
        case PlayersConstants.GAME_OVER:
            revealAllItems();
            persistAndEmitChange();
            break;
        case ItemsConstants.REVEAL_ITEM:
            var item = payload.arguments.items[0];
            revealItem(item);
            persistAndEmitChange();
            break;
        case ItemsConstants.TOGGLE_ITEM_FLAG:
            updateAllItems(payload);
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
        return data.items.filter(function(item){
            return !item.isRevealed && !item.isBomb;
        });
    },
    getFlags:function(){
        return data.flags;
    },
    getById:function(id){
        return data.items.index(id);
    },
    dispatcherIndex:Dispatcher.register(_dispatcher)
});
