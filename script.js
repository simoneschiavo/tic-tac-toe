
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

const GameController = (function () {
    // When "Start new game" button is clicked, render the gameboard
    const newGameBtn = document.querySelector(".new-game-btn");
    newGameBtn.addEventListener("click", () => {
        Gameboard.reset();
        Gameboard.render();
        ScreenController.removeWinnerMsg();
    });

    const players = [
        {
            name: "Player One",
            token: "x",
            score: 0,
        },
        {
            name: "Player Two",
            token: "o",
            score: 0,
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
        checkWinner();
        changePlayerTurn();
        Gameboard.render();
    };

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combinations of winningCombinations) {
            const values = combinations.map(position => Gameboard.get()[position]);
            if (values[0] !== "" && values.every(value => value === values[0])) {
                ScreenController.showWinnerMsg();
                getActivePlayer().score++;
            }; 
        };

        // Add logic to check for ties here later
    };

    return { changePlayerTurn, getActivePlayer, playRound, checkWinner }

})();

const ScreenController = (function () {
    const gameControllers = document.querySelector(".game-controllers");
    const winnerMsg = document.createElement("div");
    winnerMsg.classList.add("winner-msg");

    const showWinnerMsg = () => {
        winnerMsg.textContent = `${GameController.getActivePlayer().name} won!`;
        gameControllers.appendChild(winnerMsg);
    };

    const removeWinnerMsg = () => {
        gameControllers.removeChild(winnerMsg);
    };

    return { showWinnerMsg, removeWinnerMsg }
})();