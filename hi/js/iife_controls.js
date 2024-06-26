// keyboard
keyboard = {
    _pressed: {},
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function (event) {
        this._pressed[event.keyCode] = true;
    },
    onKeyup: function (event) {
        delete this._pressed[event.keyCode];
    }
};


// keyboard events
window.addEventListener('keyup', function (event) { keyboard.onKeyup(event); }, false);
window.addEventListener('keydown', function (event) {
    keyboard.onKeydown(event);
}, false);

function controlTick() {
    console.log(keyboard._pressed);
}