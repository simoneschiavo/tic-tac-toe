
const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const get = () => board;

    const gameboardDiv = document.querySelector("#gameboard");

    const render = () => {
        gameboardDiv.innerHTML = "";
        board.forEach((cell, position) => {
            const cellDiv = document.createElement("button");
            cellDiv.classList.add("cell");
            cellDiv.setAttribute("data-attribute", `${position}`);
            if (cell !== "") {
                cellDiv.disabled = true;
            }
            const cellToken = document.createElement("div");
            cellToken.classList.add("token");
            cellToken.textContent = cell;
            cellDiv.appendChild(cellToken);
            gameboardDiv.appendChild(cellDiv);

            cellDiv.addEventListener("click", () => {
                GameController.playRound(cellDiv);
            });
        });
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const markCell = position => {
        board[position] = GameController.getActivePlayer().token;
    };

    return { get, render, reset, markCell };
})();

const GameController = (function (playerOneName, playerTwoName) {
    // When "Start new game" button is clicked, render the gameboard
    const newGameBtn = document.querySelector(".new-game-btn");
    newGameBtn.addEventListener("click", () => {
        Gameboard.reset();
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

    const playRound = (cell) => {
        const cellPosition = cell.getAttribute("data-attribute");
        Gameboard.markCell(cellPosition);
        changePlayerTurn();
        Gameboard.render();
    };

    return { changePlayerTurn, getActivePlayer, playRound }

})();

// const ScreenController = (function () {
//    
// })();