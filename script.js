// Add the gameboard
const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const render = () => board;

    return { render };
})();

// console.table(Gameboard.render());