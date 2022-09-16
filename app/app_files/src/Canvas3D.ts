import * as Models from "./Models.js";
export class RenderContext {
    constructor(public viewPoint: number, public focalPoint: number) {}
}

export class Scene {
    private readonly _ctx: CanvasRenderingContext2D;
    renderContext = new RenderContext(0, -8);
    models: Models.Model[] = [];

    constructor(
        private _canvasWidth: number,
        private _canvasHeight: number,
        public canvasName: string = "Canvas3D"
    ) {
        document.documentElement.style.overflow = "hidden";
        const canvas = document.createElement("canvas");
        canvas.width = this._canvasWidth;
        canvas.height = this._canvasHeight;
        document.getElementsByTagName("body")[0].appendChild(canvas);
        this._ctx = this.getCanvasContext(canvas);
        this._ctx.translate(this._canvasWidth / 2, this._canvasHeight / 2);
    }

    private getCanvasContext(
        canvas: HTMLCanvasElement
    ): CanvasRenderingContext2D {
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("canvas.getContext returned null...");
        } else {
            return ctx;
        }
    }

    renderAll(): void {
        this.models.forEach((model) => {
            const points: [number, number][] = [];
            model.verteces.forEach((vertex) => {
                const ratio =
                    (this.renderContext.viewPoint -
                        this.renderContext.focalPoint) /
                    (vertex[2] - this.renderContext.focalPoint);

                points.push([
                    100 * ratio * vertex[0],
                    100 * ratio * -vertex[1],
                ]);
            });
            points.forEach((point1) => {
                points.forEach((point2) => {
                    this._ctx.moveTo(point1[0], point1[1]);
                    this._ctx.lineTo(point2[0], point2[1]);
                    this._ctx.stroke();
                });
            });
        });
    }

    clear(): void {
        this._ctx.beginPath();
        this._ctx.fillStyle = "white";
        this._ctx.fillRect(
            -(this._canvasWidth / 2),
            -(this._canvasHeight / 2),
            this._canvasWidth,
            this._canvasHeight
        );
    }
}
