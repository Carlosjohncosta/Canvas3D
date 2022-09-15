"use strict";
var Canvas3D;
(function (Canvas3D) {
    var Point = (function () {
        function Point(x, y, z) {
            this._coords = [x, y, z];
        }
        Object.defineProperty(Point.prototype, "coords", {
            get: function () {
                return this._coords;
            },
            enumerable: false,
            configurable: true
        });
        return Point;
    }());
    Canvas3D.Point = Point;
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
            this.renderContext = new RenderContext(0, -3);
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
        Scene.prototype.drawModel = function (model) {
            var _this = this;
            var points = [];
            model.verteces.forEach(function (vertex) {
                var ratio = (_this.renderContext.viewPoint - _this.renderContext.focalPoint) /
                    (vertex.coords[2] - _this.renderContext.focalPoint);
                points.push([100 * ratio * vertex.coords[0], 100 * ratio * vertex.coords[1]]);
            });
            points.forEach(function (point1) {
                points.forEach(function (point2) {
                    _this._ctx.moveTo(point1[0], point1[1]);
                    _this._ctx.lineTo(point2[0], point2[1]);
                    _this._ctx.stroke();
                });
            });
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
                        this._verteces.push(new Canvas3D.Point(this.center.coords[0] + x, this.center.coords[1] + y, this.center.coords[2] + z));
                    }
                }
            }
        }
        Cube.prototype.draw = function (renderContext, ctx) {
            var points = [];
            this.verteces.forEach(function (vertex) {
                var ratio = (renderContext.viewPoint - renderContext.focalPoint) /
                    (vertex.coords[2] - renderContext.focalPoint);
                points.push([100 * ratio * vertex.coords[0], 100 * ratio * vertex.coords[1]]);
            });
            points.forEach(function (point1) {
                points.forEach(function (point2) {
                    ctx.moveTo(point1[0], point1[1]);
                    ctx.lineTo(point2[0], point2[1]);
                    ctx.stroke();
                });
            });
        };
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
        return Cube;
    }());
    Models.Cube = Cube;
})(Models || (Models = {}));
window.onload = function () {
    var canvas3D = new Canvas3D.Scene(window.innerWidth, window.innerHeight);
    var cube = new Models.Cube(new Canvas3D.Point(0, 0, 20), 5);
    canvas3D.drawModel(cube);
    document.addEventListener("keypress", function () { return console.log("Working!"); });
};
//# sourceMappingURL=Canvas3d.js.map