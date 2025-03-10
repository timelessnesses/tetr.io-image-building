class Playfield {

    /**
     * Creates an instance of Playfield.
     * @param {number} [column=10]
     * @param {number} [row=20]
     * @memberof Playfield
     */
    constructor(column = 10, row = 20)
    {
        this.column = column;
        this.row = row;
        this.matrix = this.__createMatrix(column, row);
    }

    __createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }
    collide(piece){
        const [m, o] = [piece.matrix, piece.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (this.matrix[y + o.y] &&
                    this.matrix[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
    
    merge(piece) {
        piece.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value !== 0){
                    this.matrix[(y + piece.pos.y)][(x + piece.pos.x)] = value;
                }
            });
        });
    }

    /**
     * Sweep the playfield and returns the numbers of line cleared.
     */
    sweep()
    {
        let rowCount = 0;

        outer: for (let y = this.row - 1; y > 0; --y) {
            for (let x = 0; x < this.column; ++x) {
                if (this.matrix[y][x] === 0) {
                    continue outer;
                }
            }
            
            const row = this.matrix.splice(y, 1)[0].fill(0);
            this.matrix.unshift(row);
            ++y;

            rowCount ++;
        }
        return rowCount;
    }

    
}