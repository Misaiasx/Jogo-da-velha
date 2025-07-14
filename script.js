const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],  // linhas
  [0,3,6], [1,4,7], [2,5,8],  // colunas
  [0,4,8], [2,4,6]            // diagonais
];

// Cria células
function createBoard() {
  board.innerHTML = '';
  gameState.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

// Clica na célula
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
  } else if (gameState.every(cell => cell !== "")) {
    statusText.textContent = 'Empate!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Vez do jogador: ${currentPlayer}`;
  }
}

// Verifica vitória
function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

// Reinicia jogo
resetButton.addEventListener('click', () => {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
  createBoard();
});

createBoard();
