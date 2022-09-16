"use strict";
var Canvas3D;
(function (Canvas3D) {
    var RenderContext = (function () {
        function RenderContext(viewPoint, focalPoint) {
            this.viewPoint = viewPoint;
            this.focalPoint = focalPoint;
        }
        return RenderContext;
    }());
    Canvas3D.RenderContext = RenderContext;
    var Scene = (function () {
        function Scene(_canvasWidth, _canvasHeight, canvasName) {
            if (canvasName === void 0) { canvasName = "Canvas3D"; }
            this._canvasWidth = _canvasWidth;
            this._canvasHeight = _canvasHeight;
            this.canvasName = canvasName;
            this.renderContext = new RenderContext(0, -8);
            this.models = [];
            document.documentElement.style.overflow = "hidden";
            var canvas = document.createElement("canvas");
            canvas.width = this._canvasWidth;
            canvas.height = this._canvasHeight;
            document.getElementsByTagName("body")[0].appendChild(canvas);
            this._ctx = this.getCanvasContext(canvas);
            this._ctx.translate(this._canvasWidth / 2, this._canvasHeight / 2);
        }
        Scene.prototype.getCanvasContext = function (canvas) {
            var ctx = canvas.getContext("2d");
            if (!ctx) {
                throw new Error("canvas.getContext returned null...");
            }
            else {
                return ctx;
            }
        };
        Scene.prototype.renderAll = function () {
            var _this = this;
            this.models.forEach(function (model) {
                var points = [];
                model.verteces.forEach(function (vertex) {
                    var ratio = (_this.renderContext.viewPoint - _this.renderContext.focalPoint) /
                        (vertex[2] - _this.renderContext.focalPoint);
                    points.push([100 * ratio * vertex[0], 100 * ratio * -vertex[1]]);
                });
                points.forEach(function (point1) {
                    points.forEach(function (point2) {
                        _this._ctx.moveTo(point1[0], point1[1]);
                        _this._ctx.lineTo(point2[0], point2[1]);
                        _this._ctx.stroke();
                    });
                });
            });
        };
        Scene.prototype.clear = function () {
            this._ctx.beginPath();
            this._ctx.fillStyle = "white";
            this._ctx.fillRect(-(this._canvasWidth / 2), -(this._canvasHeight / 2), this._canvasWidth, this._canvasHeight);
        };
        return Scene;
    }());
    Canvas3D.Scene = Scene;
})(Canvas3D || (Canvas3D = {}));
var Models;
(function (Models) {
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
    Models.Cube = Cube;
})(Models || (Models = {}));
window.onload = function () {
    var canvas3D = new Canvas3D.Scene(window.innerWidth, window.innerHeight);
    var cube = new Models.Cube([0, 0, 10], 5);
    canvas3D.models.push(cube);
    var keysPressed = [];
    setInterval(function () {
        canvas3D.clear();
        canvas3D.renderAll();
        keyHandler();
    }, 0);
    document.addEventListener("keydown", function (e) {
        if (keysPressed.indexOf(e.key) === -1)
            keysPressed.push(e.key);
    });
    document.addEventListener("keyup", function (e) {
        if (keysPressed.indexOf(e.key) !== -1)
            keysPressed.splice(keysPressed.indexOf(e.key), 1);
    });
    function keyHandler() {
        var ammount = 0.5;
        keysPressed.forEach(function (key) {
            canvas3D.models.forEach(function (model) {
                switch (key) {
                    case "ArrowUp":
                        model.moveCenter([0, ammount, 0]);
                        break;
                    case "ArrowDown":
                        model.moveCenter([0, -ammount, 0]);
                        break;
                    case "ArrowLeft":
                        model.moveCenter([-ammount, 0, 0]);
                        break;
                    case "ArrowRight":
                        model.moveCenter([ammount, 0, 0]);
                        break;
                    case "w":
                        model.moveCenter([0, 0, ammount]);
                        break;
                    case "s":
                        model.moveCenter([0, 0, -ammount]);
                        break;
                }
            });
        });
    }
};
//# sourceMappingURL=Canvas3d.js.map