class Point
{
    constructor(public readonly i: number, public readonly j: number) {}
}

export class Square
{
    constructor(public color: string, public isEmpty: boolean) {}
}

const shape_defs = [
    {
        color: "blueviolet",
        def: [
            [0, 1, 0],
            [1, 1, 1]
        ]
    },
    {
        color: "red",
        def: [
            [1, 1, 0],
            [0, 1, 1]
        ]
    },
    {
        color: "limegreen",
        def: [
            [0, 1, 1],
            [1, 1, 0]
        ]
    },
    {
        color: "aqua",
        def: [
            [1, 1, 1, 1]
        ]
    },
    {
        color: "goldenrod",
        def: [
            [1, 1],
            [0, 1],
            [0, 1],
            [0, 1]
        ]
    },
    {
        color: "goldenrod",
        def: [
            [1, 1],
            [0, 1],
            [0, 1],
            [0, 1]
        ]
    },
    {
        color: "dodgerblue",
        def: [
            [1, 1],
            [1, 0],
            [1, 0],
            [1, 0]
        ]
    },
    {
        color: "gold",
        def: [
            [1, 1],
            [1, 1]
        ]
    },
];

export class Board
{
    private shape!: Shape;
    private shapePosition!: Point;

    constructor(private m: number, private n: number)
    {
        this.createShape();
    }

    private createShape()
    {
        this.shape = Shape.createRandom();

        // by default position new shape center top
        this.shapePosition = new Point(-1 * this.shape.getHeight(), Math.floor((this.m - this.shape.getWidth()) / 2));
    }

    initSquares(): Square[][]
    {
        let result = [];

        for (let i = 0; i < this.n; i++)
        {
            let row = [];

            for (let j = 0; j < this.m; j++)
                row.push(new Square('', true));

            result.push(row);
        }

        return result;
    }

    moveShapeDown(squares: Square[][]): boolean
    {
        const p = this.shapePosition;
        const def = this.shape.getDef();
        const a = this.shape.getWidth();
        const b = this.shape.getHeight();
        let result = squares.slice(0);

        for (let i = b - 1; i >= 0; i--)
        for (let j = 0; j < a; j++)
        {
            let s_i = p.i + i;
            let s_j = p.j + j;

            if (s_i + 1 >= this.n) return false;

            if (def[i][j] === 1 && s_i + 1 >= 0)
            {
                if (s_i + 1 === 0)
                {
                    result[s_i + 1][s_j].color = this.shape.color;
                    result[s_i + 1][s_j].isEmpty = false;
                }
                else
                {
                    if (!result[s_i + 1][s_j].isEmpty)
                    {
                        // todo: gameover check
                        this.createShape();
                        return false;
                    }

                    result[s_i + 1][s_j] = new Square(result[s_i][s_j].color, result[s_i][s_j].isEmpty);
                    result[s_i][s_j].isEmpty = true;
                    result[s_i][s_j].color = '';
                }
            }
        }

        squares = result;
        this.shapePosition = new Point(this.shapePosition.i + 1, this.shapePosition.j);

        return true;
    }

    moveShapeLeft(squares: Square[][]): boolean
    {
        const p = this.shapePosition;
        const def = this.shape.getDef();
        const a = this.shape.getWidth();
        const b = this.shape.getHeight();
        let result = squares.slice(0);

        for (let i = b - 1; i >= 0; i--)
        for (let j = 0; j < a; j++)
        {
            let s_i = p.i + i;
            let s_j = p.j + j;

            if (s_j - 1 < 0) return false;

            if (def[i][j] === 1 && s_i >= 0)
            {
                if (!result[s_i][s_j - 1].isEmpty)
                    return false;

                result[s_i][s_j - 1] = new Square(result[s_i][s_j].color, result[s_i][s_j].isEmpty);
                result[s_i][s_j].isEmpty = true;
                result[s_i][s_j].color = '';
            }
        }

        squares = result;
        this.shapePosition = new Point(this.shapePosition.i, this.shapePosition.j - 1);

        return true;
    }

    moveShapeRight(squares: Square[][]): boolean
    {
        const p = this.shapePosition;
        const def = this.shape.getDef();
        const a = this.shape.getWidth();
        const b = this.shape.getHeight();
        let result = squares.slice(0);

        for (let i = b - 1; i >= 0; i--)
        for (let j = a - 1; j >= 0; j--)
        {
            let s_i = p.i + i;
            let s_j = p.j + j;

            if (s_j + 1 >= this.m) return false;

            if (def[i][j] === 1 && s_i >= 0)
            {
                if (!result[s_i][s_j + 1].isEmpty)
                    return false;

                result[s_i][s_j + 1] = new Square(result[s_i][s_j].color, result[s_i][s_j].isEmpty);
                result[s_i][s_j].isEmpty = true;
                result[s_i][s_j].color = '';
            }
        }

        squares = result;
        this.shapePosition = new Point(this.shapePosition.i, this.shapePosition.j + 1);

        return true;
    }

    rotateShape(squares: Square[][]): boolean
    {
        const p = this.shapePosition;
        const def = this.shape.getDef();
        const a = this.shape.getWidth();
        const b = this.shape.getHeight();

        let rotated = this.shape.clone();
        rotated.rotate();
        let rotatedDef = rotated.getDef();

        // compensate height when rotating
        let p_rotated = new Point(p.i - (rotated.getHeight() - b), a);

        let result = squares.slice(0);

        if (p_rotated.j + b >= this.m) return false;
        if (p_rotated.i + a >= this.n) return false;

        // clear previous shape
        for (let i = 0; i < b; i++)
        for (let j = 0; j < a; j++)
        {
            let s_i = p.i + i;
            let s_j = p.j + j;

            if (def[i][j] === 1 && !result[s_i][s_j].isEmpty)
            {
                result[s_i][s_j].isEmpty = true;
                result[s_i][s_j].color = '';
            }
        }

        for (let i = 0; i < rotated.getHeight(); i++)
        for (let j = 0; j < rotated.getWidth(); j++)
        {
            let s_i = p_rotated.i + i;
            let s_j = p_rotated.j + j;

            if (rotatedDef[i][j] === 1)
            {
                if (!result[s_i][s_j].isEmpty)
                {
                    // collision
                    this.shape.rotate();
                    this.shape.rotate();
                    this.shape.rotate();
                    return false;
                }

                result[s_i][s_j] = new Square(this.shape.color, false);
            }
            
        }

        squares = result;

        return true;
    }
}

export class Shape
{
    private constructor(private shape_def: Array<Array<number>>, public readonly color: string) {}

    public clone(): Shape
    {
        return new Shape(this.shape_def, this.color);
    }

    public static createRandom(): Shape
    {
        let rnd_def = shape_defs[Math.floor(Math.random() * shape_defs.length)];

        return new Shape(rnd_def.def, rnd_def.color);
    }

    getWidth = () => this.shape_def[0].length;
    getHeight = () => this.shape_def.length;
    getDef = () => this.shape_def.slice(0);

    /** rotate shape right 90 deg */
    rotate()
    {
        const m = this.getWidth();
        const n = this.getHeight();

        let result = [];

        for (let i = 0; i < m; i++)
        {
            let row = [];

            for (let j = n - 1; j >= 0; j--)
                row.push(this.shape_def[j][i]);

            result.push(row);
        }

        this.shape_def = result;
    }
}