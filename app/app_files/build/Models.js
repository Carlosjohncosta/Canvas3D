var Cube = (function () {
    function Cube(_center, _length) {
        this._center = _center;
        this._length = _length;
        this._verteces = [];
        for (var x = -(this._length / 2); x <= this._length / 2; x += this._length) {
            for (var y = -(this._length / 2); y <= this._length / 2; y += this._length) {
                for (var z = -(this._length / 2); z <= this._length / 2; z += this._length) {
                    this._verteces.push([
                        this.center[0] + x,
                        this.center[1] + y,
                        this.center[2] + z,
                    ]);
                }
            }
        }
    }
    Object.defineProperty(Cube.prototype, "verteces", {
        get: function () {
            return this._verteces;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cube.prototype, "center", {
        get: function () {
            return this._center;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cube.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    Cube.prototype.moveCenter = function (ammount) {
        for (var i = 0; i < 3; i++) {
            this._center[i] += ammount[i];
        }
        console.log(this._center);
        this._verteces.map(function (vertex) {
            for (var i = 0; i < 3; i++) {
                vertex[i] += ammount[i];
            }
        });
    };
    return Cube;
}());
export { Cube };
