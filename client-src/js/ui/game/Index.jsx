var React = require('react');
var Items = require('./items/Items');
var PlayerActions = require('../../app/game/PlayerActions');

var offsetLeft = 0;
var offsetTop = 0;

function clampCoordinates(x,y){
    if(x < 0){
        x = 0;
    } else if(x > window.innerWidth){
        x = window.innerWidth;
    }

    if(y < 0){
        y = 0;
    } else if(y > window.innerHeight){
        y = window.innerHeight;
    }

    return [x,y];
}

function parseKeyboardEvent(event){
    var code = typeof event.key === 'undefined'? event.keyCode : event.key;
    var shift = event.shiftKey;
    var ctrl = event.ctrlKey;
    return [code,shift,ctrl];
}

var GameIndex = React.createClass({
    componentWillUnmount: function () {
        window.removeEventListener('resize',this._resize);
        window.removeEventListener('keydown',this._onKeyDown);
        window.removeEventListener('keyup',this._onKeyUp);
        window.removeEventListener('keypress',this._onKeyPress);
    },
    componentDidMount: function(){
        this._updateOffsets();
        window.addEventListener('resize',this._resize);
        window.addEventListener('keydown',this._onKeyDown);
        window.addEventListener('keyup',this._onKeyUp);
        window.addEventListener('keypress',this._onKeyPress);
    },
    componentDidUpdate: function(){
        this._updateOffsets();
    },
    _resize: function(){
        this._updateOffsets();
    },
    _updateOffsets(){
        var ref = this.refs.game.getDOMNode();
        var bounds = ref.getBoundingClientRect();
        offsetLeft = bounds.left;
        offsetTop = bounds.top;
    },
    _onMouseMove: function(event){
        var x = event.pageX - offsetLeft;
        var y = event.pageY - offsetTop;
        PlayerActions.mouseMove.apply(PlayerActions,clampCoordinates(x,y));
    },
    _onMouseEnter: function(event){
        var x = event.pageX - offsetLeft;
        var y = event.pageY - offsetTop;
        PlayerActions.mouseEnter.apply(PlayerActions,clampCoordinates(x,y));
    },
    _onMouseLeave: function(event){
        var x = event.pageX - offsetLeft;
        var y = event.pageY - offsetTop;
        PlayerActions.mouseLeave.apply(PlayerActions,clampCoordinates(x,y));
    },
    _onKeyPress: function(event){
        PlayerActions.keyPress.apply(PlayerActions,parseKeyboardEvent(event));
    },
    _onKeyDown: function(event){
        PlayerActions.keyDown.apply(PlayerActions,parseKeyboardEvent(event));
    },
    _onKeyUp: function(event){
        PlayerActions.keyUp.apply(PlayerActions,parseKeyboardEvent(event));
    },
    render: function() {
        return (
            <div ref="game" id="game"
                 onMouseEnter={this._onMouseEnter}
                 onMouseLeave={this._onMouseLeave}
                 onMouseMove={this._onMouseMove}>
                <div ref="stage" id="stage">
                    <Items/>
                </div>
            </div>
        );
    }
});

module.exports = GameIndex;
