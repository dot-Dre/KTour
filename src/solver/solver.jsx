class PositionMapper {
    constructor() {
        this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    }

    getPositionFromCell(file, rank) {
        let fileIndex = this.files.indexOf(file);
        let rankIndex = this.ranks.indexOf(rank);
        return [fileIndex, rankIndex];
    }

    getCellFromPosition(row, col) {
        return this.files[col] + this.ranks[7 - row];
    }
}

class KnightTourSolver {
    constructor() {
        this.moveX = [2, 1, -1, -2, -2, -1, 1, 2];
        this.moveY = [1, 2, 2, 1, -1, -2, -2, -1];
        this.positionMapper = new PositionMapper();
    }

    solve(row, col) {
        let board = Array(8).fill().map(() => Array(8).fill(0));
        board[row][col] = 1;
        this.solveKTour(board, row, col, 1);
        return board;
    }

    solveKTour(board, row, col, moves) {
        if (moves === 64) return true;

        let nextMoves = this.getNextMovesWarnsdorff(board, row, col);

        for (let move of nextMoves) {
            let [newX, newY] = [move.x, move.y];
            board[newX][newY] = moves + 1;
            if (this.solveKTour(board, newX, newY, moves + 1)) {
                return true;
            }
            board[newX][newY] = 0;
        }

        return false;
    }

    getNextMovesWarnsdorff(board, row, col) {
        let moves = [];

        for (let i = 0; i < 8; i++) {
            let newX = row + this.moveX[i];
            let newY = col + this.moveY[i];
            if (this.safeMove(board, newX, newY)) {
                let degree = this.countAvailableMoves(board, newX, newY);
                moves.push({ x: newX, y: newY, degree: degree });
            }
        }

        return moves.sort((a, b) => a.degree - b.degree);
    }

    countAvailableMoves(board, row, col) {
        let count = 0;
        for (let i = 0; i < 8; i++) {
            let newX = row + this.moveX[i];
            let newY = col + this.moveY[i];
            if (this.safeMove(board, newX, newY)) {
                count++;
            }
        }
        return count;
    }

    safeMove(board, row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] === 0;
    }

    getStringRepresentation(board) {
        let maxDigits = Math.max(...board.flat()).toString().length;
        return board.map(row => 
            row.map(cell => cell.toString().padStart(maxDigits)).join(' ')
        ).join('\n');
    }

    getTourMoves(board) {
        let moves = {};
        let result = [];

        for (let i = 0; i < board.length; i++) {
            for (let k = 0; k < board[i].length; k++) {
                let moveNumber = board[i][k];
                moves[moveNumber] = this.positionMapper.getCellFromPosition(i, k);
            }
        }

        Object.keys(moves).sort((a, b) => a - b).forEach(key => {
            result.push(moves[key]);
        });

        return result;
    }
}

export default KnightTourSolver;