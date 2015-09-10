var Immutable = require('../../modules/immutable');
var Definitions = require('../../../../config/Definitions');
var Items = Definitions.Items;
var Tools = Definitions.Tools;
var uuid = require('node-uuid');

var ItemModel = Immutable.Model.extend(function ItemModel(data){
    this.id = data.id || uuid.v4();

    this.isFlag = data.isFlag || false;
    this.isBomb = data.isBomb || false;
    this.label = data.label || '';
    this.isRevealed = data.isRevealed || false;

    this.col = data.col;
    this.row = data.row;

    if(data.id){
        Immutable.Freezer.freeze(this);
    }
});

var OptionsModel = Immutable.Model.extend(function OptionsModel(data){
    this.width = data.width;
    this.height = data.height;
    this.difficulty = data.difficulty;
    this.totalBombs = data.totalBombs;
    this.totalSquares = data.totalSquares;

    Immutable.Freezer.freeze(this);
});

module.exports = {
    generateGame: function(width, height, difficulty) {
        var items = [];
        var h = 0;
        var total = Math.floor(width * height);
        var percent = Definitions.Difficulties[difficulty].percent;
        var maxBombs = Math.floor(total * (percent / 100));

        var options = new OptionsModel({
            width:width,
            height:height,
            difficulty:difficulty,
            totalBombs:maxBombs,
            totalSquares:total
        });

        while(h < height){
            var w = 0;
            while(w < width){
                items.push(new ItemModel({
                    row:h,
                    col:w
                }));
                w++;
            }
            h++;
        }

        while(maxBombs){
            items[Math.floor(Math.random() * total)].isBomb = true;
            maxBombs--;
        }

        items.forEach(function(item){
            var col = item.col;
            var row = item.row;

            var startingCol = Math.floor(col - 1);
            var startingRow = Math.floor(row - 1);

            var endCol = Math.floor(col + 1);
            var endRow = Math.floor(row + 1);

            item.label = items.filter(function(item){
                return item.isBomb &&
                    item.col >= startingCol &&
                    item.col <= endCol &&
                    item.row >= startingRow &&
                    item.row <= endRow;
            }).length;

            Immutable.Freezer.freeze(item);
        });

        return {
            items:items,
            options:options
        };
    },
    ItemModel: ItemModel,
    OptionsModel: OptionsModel
};