namespace Models {
    export interface Model {
        verteces: Canvas3D.Point[];
        center: Canvas3D.Point;
        length: Number;
        draw(renderContext: Canvas3D.RenderContext, ctx: CanvasRenderingContext2D): void;
    }

    export class Cube implements Model {
        private _verteces: Canvas3D.Point[] = [];

        constructor(private _center: Canvas3D.Point, private _length: number) {
            for (let x = -(this._length / 2); x <= this._length / 2; x += this._length) {
                for (let y = -(this._length / 2); y <= this._length / 2; y += this._length) {
                    for (let z = -(this._length / 2); z <= this._length / 2; z += this._length) {
                        this._verteces.push(
                            new Canvas3D.Point(
                                this.center.coords[0] + x,
                                this.center.coords[1] + y,
                                this.center.coords[2] + z
                            )
                        );
                    }
                }
            }
        }

        draw(renderContext: Canvas3D.RenderContext, ctx: CanvasRenderingContext2D): void {
            const points: number[][] = [];
            this.verteces.forEach((vertex) => {
                const ratio =
                    (renderContext.viewPoint - renderContext.focalPoint) /
                    (vertex.coords[2] - renderContext.focalPoint);
                points.push([100 * ratio * vertex.coords[0], 100 * ratio * vertex.coords[1]]);
            });
            points.forEach((point1) => {
                points.forEach((point2) => {
                    ctx.moveTo(point1[0], point1[1]);
                    ctx.lineTo(point2[0], point2[1]);
                    ctx.stroke();
                });
            });
        }

        get verteces() {
            return this._verteces;
        }
        get center() {
            return this._center;
        }
        get length() {
            return this._length;
        }
    }
}
