// Add the gameboard
const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const gameboardDiv = document.querySelector("#gameboard");
    const render = () => {
        gameboardDiv.innerHTML = "";
        board.forEach((cell, position) => {
            gameboardDiv.innerHTML += `<div class="cell" id="cell-${position}">${cell}</div>`;
        });
    };

    return { render };
})();

Gameboard.render();