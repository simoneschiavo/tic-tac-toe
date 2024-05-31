
const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const gameboardDiv = document.querySelector("#gameboard");

    const render = () => {
        gameboardDiv.innerHTML = "";
        board.forEach((cell, position) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.setAttribute("data-attribute", `cell-${position}`);
            const cellToken = document.createElement("div");
            cellToken.classList.add("token");
            cellToken.textContent = cell;
            cellDiv.appendChild(cellToken);
            gameboardDiv.appendChild(cellDiv);
        });
    };

    return { render };
})();

const GameControllers = (function () {
    // When "Start new game" button is clicked, render the gameboard
    const newGameBtn = document.querySelector(".new-game-btn");
    newGameBtn.addEventListener("click", () => {
        Gameboard.render();
    });
})();