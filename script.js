
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

    const markCell = position => {
        board[position] = getActivePlayer().token;
    };

    return { render, markCell };
})();

const GameController = (function (playerOneName, playerTwoName) {
    // When "Start new game" button is clicked, render the gameboard
    const newGameBtn = document.querySelector(".new-game-btn");
    newGameBtn.addEventListener("click", () => {
        Gameboard.render();
    });

    const players = [
        {
            name: playerOneName,
            token: "x",
        },
        {
            name: playerTwoName,
            token: "o",
        }
    ];

    let activePlayer = players[0];

    const changePlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = () => {

    }

    return { changePlayerTurn, getActivePlayer }

})();