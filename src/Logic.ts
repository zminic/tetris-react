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
            [0, 1]
        ]
    },
    {
        color: "dodgerblue",
        def: [
            [1, 1],
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
    private nextShape!: Shape;
    private shapePosition!: Point;
    public squares!: Square[][];
    public gameOver: boolean = false;

    constructor(public m: number, public n: number)
    {
        this.nextShape = Shape.createRandom();
        this.createShape();
        this.initSquares();
    }

    private createShape()
    {
        this.shape = this.nextShape.clone();
        this.nextShape = Shape.createRandom();

        // by default position new shape center top
        this.shapePosition = new Point(-1 * this.shape.getHeight(), Math.floor((this.m - this.shape.getWidth()) / 2));
    }

    private cloneSquares(squares: Square[][]): Square[][]
    {
        let result = [];

        for (let i = 0; i < this.n; i++)
        {
            let row = [];

            for (let j = 0; j < this.m; j++)
                row.push(new Square(squares[i][j].color, squares[i][j].isEmpty));

            result.push(row);
        }

        return result;
    }

    private initSquares()
    {
        let result = [];

        for (let i = 0; i < this.n; i++)
        {
            let row = [];

            for (let j = 0; j < this.m; j++)
                row.push(new Square('', true));

            result.push(row);
        }

        this.squares = result;
    }

    getNextShape(): Square[][]
    {
        return this.nextShape.getDef().map(row => row.map(value => new Square(value===0 ? '': this.nextShape.color, value === 0)));
    }

    moveShapeDown(): boolean
    {
        const p = this.shapePosition;
        const def = this.shape.getDef();
        const a = this.shape.getWidth();
        const b = this.shape.getHeight();
        let result = this.cloneSquares(this.squares);

        for (let i = b - 1; i >= 0; i--)
        for (let j = 0; j < a; j++)
        {
            let s_i = p.i + i;
            let s_j = p.j + j;

            if (s_i + 1 >= this.n) {
                this.createShape();

                return false;
            }

            if (def[i][j] === 1 && s_i + 1 >= 0)
            {
                if (s_i + 1 === 0)
                {
                    result[s_i + 1][s_j] = new Square(this.shape.color, false);
                }
                else
                {
                    if (!result[s_i + 1][s_j].isEmpty)
                    {
                        if (p.i < 0) // game over
                            this.gameOver = true;
                        else
                            this.createShape();

                        return false;
                    }

                    result[s_i + 1][s_j] = new Square(result[s_i][s_j].color, result[s_i][s_j].isEmpty);
                    result[s_i][s_j] = new Square('', true);
                }
            }
        }

        this.squares = result;
        this.shapePosition = new Point(this.shapePosition.i + 1, this.shapePosition.j);

        return true;
    }

    clearCompleted(): boolean
    {
        let result = this.cloneSquares(this.squares);
        let changed = false;
        let i = this.n - 1;

        while (i >= 0)
        {
            let complete: boolean = true;

            for (let j = 0; j < this.m; j++)
                complete = complete && !result[i][j].isEmpty;

            if (complete)
            {
                changed = true;

                for (let x = i; x >= 1; x--)
                    for(let y = 0; y < this.m; y++)
                        result[x][y] = result[x - 1][y];
            }
            else i--;
        }

        if (changed) this.squares = result;

        return changed;
    }

    moveShapeLeft(): boolean
    {
        const p = this.shapePosition;
        const def = this.shape.getDef();
        const a = this.shape.getWidth();
        const b = this.shape.getHeight();
        let result = this.cloneSquares(this.squares);

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
                result[s_i][s_j] = new Square('', true);
            }
        }

        this.squares = result;
        this.shapePosition = new Point(this.shapePosition.i, this.shapePosition.j - 1);

        return true;
    }

    moveShapeRight(): boolean
    {
        const p = this.shapePosition;
        const def = this.shape.getDef();
        const a = this.shape.getWidth();
        const b = this.shape.getHeight();
        let result = this.cloneSquares(this.squares);

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
                result[s_i][s_j] = new Square('', true);
            }
        }

        this.squares = result;
        this.shapePosition = new Point(this.shapePosition.i, this.shapePosition.j + 1);

        return true;
    }

    rotateShape(): boolean
    {
        const p = this.shapePosition;
        const def = this.shape.getDef();
        const a = this.shape.getWidth();
        const b = this.shape.getHeight();

        let rotated = this.shape.clone().rotate();

        // compensate height when rotating
        let p_rotated = new Point(p.i - (rotated.getHeight() - b), a);

        let result = this.cloneSquares(this.squares);

        if (p_rotated.j + b >= this.m) return false;
        if (p_rotated.i + a >= this.n) return false;

        // clear previous shape
        for (let i = 0; i < b; i++)
        for (let j = 0; j < a; j++)
        {
            let s_i = p.i + i;
            let s_j = p.j + j;

            if (def[i][j] === 1 && s_i >= 0 && !result[s_i][s_j].isEmpty)
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

            if (rotated.getDef()[i][j] === 1)
            {
                if (s_i < 0 || !result[s_i][s_j].isEmpty)
                {
                    // collision
                    return false;
                }

                result[s_i][s_j] = new Square(this.shape.color, false);
            }
            
        }

        this.shapePosition = new Point(p_rotated.i, p_rotated.j);
        this.shape.rotate();
        this.squares = result;

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
    getDef = () => this.shape_def;

    /** rotate shape right 90 deg */
    rotate() : Shape
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

        return this;
    }
}