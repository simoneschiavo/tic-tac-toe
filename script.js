// Add the gameboard
const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = ["", "", "", "", "", "", "", "", ""];

    const render = () => board;

    return { render };
})();

// console.table(Gameboard.getBoard());