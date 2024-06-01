
const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameEnded = false;

    const get = () => board;

    const gameboardDiv = document.querySelector("#gameboard");

    const render = () => {
        gameboardDiv.innerHTML = "";
        board.forEach((cell, position) => {
            const cellDiv = document.createElement("button");
            cellDiv.classList.add("cell");
            cellDiv.setAttribute("data-attribute", `${position}`);
            if (cell !== "" || gameEnded) {
                cellDiv.disabled = true;
            };
            const cellToken = document.createElement("div");
            cellToken.classList.add("token");
            if (cell !== "") {
                const avatar = document.createElement("img");
                avatar.src = cell;
                cellToken.appendChild(avatar);
            };
            cellDiv.appendChild(cellToken);
            gameboardDiv.appendChild(cellDiv);

            cellDiv.addEventListener("click", () => {
                GameController.playRound(cellDiv);
            });
        });
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameEnded = false;
    };

    const markCell = position => {
        board[position] = GameController.getActivePlayer().token;
    };

    const disableAllCells = () => {
        gameEnded = true;
    };

    const isGameEnded = () => gameEnded;

    return { get, render, reset, markCell, disableAllCells, isGameEnded };
})();

const GameController = (function () {
    // When "Start new game" button is clicked, render the gameboard
    const newGameBtn = document.querySelector(".new-game-btn");
    newGameBtn.addEventListener("click", () => {
        Gameboard.reset();
        Gameboard.render();
        newGameBtn.textContent = "Next battle"
        newGameBtn.disabled = true;
        ScreenController.hideGameControllers();
        ScreenController.showMoveMsg();
        ScreenController.removeWinnerMsg();
        ScreenController.removeTieMsg();
    });

    const players = [
        {
            id: 1,
            name: "Player One",
            token: "x",
            score: 0,
        },
        {
            id: 2,
            name: "Player Two",
            token: "o",
            score: 0,
        }
    ];

    let activePlayer = players[0];

    const changePlayerTurn = () => {
        if (!Gameboard.isGameEnded()) {
            activePlayer =
              activePlayer === players[0] ? players[1] : players[0];
            ScreenController.showMoveMsg();
        };
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
                ScreenController.updateScore(getActivePlayer());
                Gameboard.disableAllCells();
                newGameBtn.disabled = false;
            } else {
                checkTie();
            }; 
        };
    };

    const checkTie = () => {
        if (Gameboard.get().every(position => position !== "")) {
            ScreenController.showTieMsg();
            Gameboard.disableAllCells();
            newGameBtn.disabled = false;
        };
    };

    const heroAvatarBtns = document.querySelectorAll(".hero-avatar");
    heroAvatarBtns.forEach(heroAvatarBtn => {
        heroAvatarBtn.addEventListener("click", () => {
            heroAvatarBtns.forEach(btn => {
                if (btn !== heroAvatarBtn) {
                    btn.disabled = true;
                };
            });
            const heroImg = heroAvatarBtn.querySelector("img");
            players[0].name = heroImg.getAttribute("alt");
            players[0].token = heroImg.getAttribute("src");
            ScreenController.updateHeroSelectorMsg(heroImg);
        });
    });

    const villainAvatarBtns = document.querySelectorAll(".villain-avatar");
    villainAvatarBtns.forEach((villainAvatarBtn) => {
        villainAvatarBtn.addEventListener("click", () => {
            villainAvatarBtns.forEach((btn) => {
            if (btn !== villainAvatarBtn) {
                    btn.disabled = true;
                };
            });
            const villainImg = villainAvatarBtn.querySelector("img");
            players[1].name = villainImg.getAttribute("alt");
            players[1].token = villainImg.getAttribute("src");
            ScreenController.updateVillainSelectorMsg(villainImg);
        });
    });

    return { changePlayerTurn, getActivePlayer, playRound, checkWinner, checkTie }

})();

const ScreenController = (function () {
    const gameControllers = document.querySelector(".game-controllers");

    const systemMsgsDiv = document.querySelector(".system-msgs");

    const winnerMsg = document.createElement("div");
    winnerMsg.classList.add("winner-msg");

    const tieMsg = document.createElement("div");
    tieMsg.classList.add("tie-msg");

    const playerOneScoreDiv = document.querySelector(".playerOneScore");
    const playerTwoScoreDiv = document.querySelector(".playerTwoScore");

    const showWinnerMsg = () => {
        winnerMsg.textContent = `${GameController.getActivePlayer().name} won!`;
        removeMoveMsg();
        gameControllers.appendChild(winnerMsg);
    };

    const removeWinnerMsg = () => {
        if (winnerMsg.parentNode === gameControllers) {
          gameControllers.removeChild(winnerMsg);
        }
    };

    const showTieMsg = () => {
        tieMsg.textContent = `This game is a tie - Keep on playing!`;
        removeMoveMsg();
        gameControllers.appendChild(tieMsg);
    };

    const removeTieMsg = () => {
        if (tieMsg.parentNode === gameControllers) {
            gameControllers.removeChild(tieMsg);
        };
    };

    const updateScore = player => {
        player.score++;
        player.id === 1
            ? playerOneScoreDiv.textContent = player.score
            : playerTwoScoreDiv.textContent = player.score;
    };

    const moveMsg = document.createElement("div");
        moveMsg.classList.add("move-msg");

    const showMoveMsg = () => {
        moveMsg.textContent = `${GameController.getActivePlayer().name}, is your turn.`;
        systemMsgsDiv.appendChild(moveMsg);
    };

    const removeMoveMsg = () => {
        if (moveMsg.parentNode === systemMsgsDiv) {
            systemMsgsDiv.removeChild(moveMsg);
        };
    };

    const updateHeroSelectorMsg = (img) => {
        const heroSelectorMsg = document.querySelector(".hero-selector-msg");
        heroSelectorMsg.textContent = `Player 1, you have selected ${img.getAttribute("alt")} as your warrior. Good luck!`;
    };

    const updateVillainSelectorMsg = (img) => {
      const villainSelectorMsg = document.querySelector(".villain-selector-msg");
      villainSelectorMsg.textContent = `Player 2, you have chosen ${img.getAttribute(
        "alt"
      )} to fight for you. Good luck!`;
    };

    const hideGameControllers = () => {
        gameControllers.classList.toggle("hidden");
    };

    return { showWinnerMsg, removeWinnerMsg, showTieMsg, removeTieMsg, updateScore, showMoveMsg, updateHeroSelectorMsg, updateVillainSelectorMsg, hideGameControllers }
})();