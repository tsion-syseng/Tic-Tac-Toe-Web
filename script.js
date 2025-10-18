// Select elements
const statusDisplay = document.querySelector('.game--status');
const restartButton = document.querySelector('.game--restart');
const cells = Array.from(document.querySelectorAll('.cell'));
const scoreboard = document.querySelector('.scoreboard');

// Game state variables
let gameActive = true;
let currentPlayer = "❌";           // ❌ starts first
let gameState = ["", "", "", "", "", "", "", "", ""]; // 9 cells
let score = { "❌": 0, "⭕": 0 };    // Score tracking

// Winning combinations
const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Handle cell click
function handleCellClick(clickedCell, clickedIndex) {
    if(gameState[clickedIndex] !== "" || !gameActive) return; // Ignore invalid clicks
    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add("clicked");
    checkResult();
}

// Check win/draw and switch players
function checkResult() {
    let roundWon = false;

    // Check all winning conditions
    for(let condition of winningConditions) {
        const [a, b, c] = condition;
        if(gameState[a] === "" || gameState[b] === "" || gameState[c] === "") continue;
        if(gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    // Win detected
    if(roundWon) {
        if(currentPlayer === "⭕") {
            statusDisplay.textContent = "🎉 Tsion wins!";
        } else {
            statusDisplay.textContent = `🎉 Player ${currentPlayer} wins!`;
        }
        score[currentPlayer]++;
        updateScoreboard();
        gameActive = false;
        return;
    }

    // Draw detected
    if(!gameState.includes("")) {
        statusDisplay.textContent = "🤝 It's a draw! Play again!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";

    // Update status: Player ⭕ is Tsion
    if(currentPlayer === "❌") {
        statusDisplay.textContent = `Player ❌'s turn – make your move!`;
    } else {
        statusDisplay.textContent = `Player ⭕'s turn – Tsion, your move!`;
    }
}

// Restart the game
function handleRestart() {
    gameActive = true;
    currentPlayer = "❌";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ❌'s turn – make your move!`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("clicked");
    });
}

// Update the scoreboard
function updateScoreboard() {
    scoreboard.textContent = `❌: ${score["❌"]} | ⭕: ${score["⭕"]}`;
}

// Event listeners
cells.forEach((cell, index) => cell.addEventListener('click', () => handleCellClick(cell, index)));
restartButton.addEventListener('click', handleRestart);

