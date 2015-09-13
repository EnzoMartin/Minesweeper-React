var ItemsConstants = require('./ItemsConstants');
var PlayerConstants = require('./PlayerConstants');
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

        Dispatcher.dispatch({
            actionType: ItemsConstants.END_GENERATE_MAP_SUCCESS,
            arguments: ItemsModelFactories.generateGame(width,height,difficulty)
        });
    },
    /**
     * Load the player's previous game or generate a new game
     */
    loadPreviousGame: function(){
        var player = JSON.parse(localStorage.getItem('player') || '{}');
        var previousOptions = player.options;
        var options = {
            width: Definitions.Defaults.width,
            height: Definitions.Defaults.height,
            difficulty: Definitions.Defaults.difficulty
        };

        if(previousOptions){
            options.height = previousOptions.height;
            options.width = previousOptions.width;
            options.difficulty = previousOptions.difficulty;
        }

        var previousGame = {
            items: [],
            flags: [],
            map: [[]]
        };

        if(player.isPlaying){
            Object.keys(previousGame).forEach(function(key){
                var data = JSON.parse(localStorage.getItem(key) || 'false');
                if(data){
                    previousGame[key] = data;
                }
            });
        }

        if(previousGame.items.length){
            Dispatcher.dispatch({
                actionType: ItemsConstants.END_GENERATE_MAP_SUCCESS,
                arguments: ItemsModelFactories.loadGame(options,previousGame.items)
            });
        } else {
            this.generateMap(options.width,options.height,options.difficulty);
        }
    },
    /**
     * Triggers game over screen
     * @param won Boolean
     */
    gameOver: function(won){
        Dispatcher.dispatch({
            actionType: PlayerConstants.GAME_OVER,
            arguments:{
                won: won
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