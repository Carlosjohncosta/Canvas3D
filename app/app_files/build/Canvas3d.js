var RenderContext = (function () {
    function RenderContext(viewPoint, focalPoint) {
        this.viewPoint = viewPoint;
        this.focalPoint = focalPoint;
    }
    return RenderContext;
}());
export { RenderContext };
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
                var ratio = (_this.renderContext.viewPoint -
                    _this.renderContext.focalPoint) /
                    (vertex[2] - _this.renderContext.focalPoint);
                points.push([
                    100 * ratio * vertex[0],
                    100 * ratio * -vertex[1],
                ]);
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
export { Scene };
