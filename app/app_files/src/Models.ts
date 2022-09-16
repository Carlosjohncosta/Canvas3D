export interface Model {
    verteces: point[];
    center: point;
    length: Number;
    moveCenter(ammount: point): void;
}

export class Cube implements Model {
    private _verteces: point[] = [];

    constructor(private _center: point, private _length: number) {
        for (
            let x = -(this._length / 2);
            x <= this._length / 2;
            x += this._length
        ) {
            for (
                let y = -(this._length / 2);
                y <= this._length / 2;
                y += this._length
            ) {
                for (
                    let z = -(this._length / 2);
                    z <= this._length / 2;
                    z += this._length
                ) {
                    this._verteces.push([
                        this.center[0] + x,
                        this.center[1] + y,
                        this.center[2] + z,
                    ]);
                }
            }
        }
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

    moveCenter(ammount: point) {
        for (let i = 0; i < 3; i++) {
            this._center[i] += ammount[i];
        }
        console.log(this._center);
        this._verteces.map((vertex) => {
            for (let i = 0; i < 3; i++) {
                vertex[i] += ammount[i];
            }
        });
    }
}
