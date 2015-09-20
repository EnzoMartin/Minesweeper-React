var Immutable = require('../../modules/immutable');
var Definitions = require('../../../../config/Definitions');
var Items = Definitions.Items;
var Tools = Definitions.Tools;
var uuid = require('node-uuid');

/**
 * @define ItemModel
 * @property id String
 * @property isFlag Boolean
 * @property isBomb Boolean
 * @property label String
 * @property isRevealed Boolean
 * @property col Number
 * @property row Number
 * @property neighbors Array
 */
var ItemModel = Immutable.Model.extend(function ItemModel(data){
    this.id = data.id || uuid.v4();

    this.isFlag = data.isFlag || false;
    this.isBomb = data.isBomb || false;
    this.label = data.label || null;
    this.isRevealed = data.isRevealed || false;

    this.col = data.col;
    this.row = data.row;

    this.neighbors = data.neighbors || [];

    if(data.id){
        Immutable.Freezer.freeze(this);
        Immutable.Freezer.freeze(this.neighbors);
    }
});

/**
 * @define OptionsModel
 * @property width Number
 * @property height Number
 * @property difficulty Number
 * @property totalBombs Number
 * @property totalSquares Number
 */
var OptionsModel = Immutable.Model.extend(function OptionsModel(data){
    var difficulty = Definitions.Difficulties[data.difficulty] || Definitions.Difficulties[1];

    this.width = data.width < Definitions.Minimum.width? Definitions.Minimum.width : data.width;
    this.height = data.height < Definitions.Minimum.height? Definitions.Minimum.height : data.height;
    this.difficulty = difficulty.id;
    this.totalSquares = data.totalSquares || Math.floor(this.width * this.height);
    this.totalBombs = data.totalBombs || Math.floor(this.totalSquares * (difficulty.percent / 100));

    Immutable.Freezer.freeze(this);
});

module.exports = {
    /**
     * Re-create models from a save game
     * @param options Object
     * @param items Array
     */
    loadGame: function(options,items){
        var itemModels = [];
        var maxBombs = 0;

        items.forEach(function(item){
            if(item.isBomb){
                maxBombs++;
            }

            itemModels.push(new ItemModel(item));
        });

        var optionsModel = new OptionsModel({
            width:options.width,
            height:options.height,
            difficulty:options.difficulty,
            totalBombs:maxBombs,
            totalSquares:items.length
        });

        return {
            options: optionsModel,
            items: itemModels
        }
    },
    /**
     * Generate the game
     * @param width Number
     * @param height Number
     * @param difficulty Number
     * @returns {{items: Array, options: {OptionsModel}}}
     */
    generateGame: function(width, height, difficulty) {
        var options = new OptionsModel({
            width:width,
            height:height,
            difficulty:difficulty
        });

        var items = [];
        var h = 0;
        var totalSquares = options.totalSquares;
        var totalBombs = options.totalBombs;

        while(h < options.height){
            var w = 0;
            while(w < options.width){
                items.push(new ItemModel({
                    row:h,
                    col:w
                }));
                w++;
            }
            h++;
        }

        while(totalBombs){
            items[Math.floor(Math.random() * totalSquares)].isBomb = true;
            totalBombs--;
        }

        items.forEach(function(item){
            var col = item.col;
            var row = item.row;

            var startingCol = Math.floor(col - 1);
            var startingRow = Math.floor(row - 1);

            var endCol = Math.floor(col + 1);
            var endRow = Math.floor(row + 1);

            var neighbors = [];

            item.label = items.filter(function(item){
                var isNeighbor = item.col >= startingCol &&
                    item.col <= endCol &&
                    item.row >= startingRow &&
                    item.row <= endRow;

                if(isNeighbor){
                    neighbors.push(item.id);
                }

                return item.isBomb && isNeighbor;
            }).length;

            item.neighbors = neighbors;
            Immutable.Freezer.freeze(item);
            Immutable.Freezer.freeze(item.neighbors);
        });

        return {
            items:items,
            options:options
        };
    },
    ItemModel: ItemModel,
    OptionsModel: OptionsModel
};