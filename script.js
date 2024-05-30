// Add the gameboard
const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2D array - the console gameboard
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("x");
        };
    };

    const getBoard = () => board;

    return { getBoard };
})();

// console.table(Gameboard.getBoard());