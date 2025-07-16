const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

// Imagens
const winnerXImg = document.getElementById('winner-x-img');
const winnerOImg = document.getElementById('winner-o-img');
const drawImg = document.getElementById('draw-img');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

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

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    showResultImage(currentPlayer);
    gameActive = false;
  } else if (gameState.every(cell => cell !== "")) {
    statusText.textContent = 'Empate!';
    showResultImage('draw');
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Vez do jogador: ${currentPlayer}`;
  }
}

function checkWinner() {
  return winningConditions.some(([a, b, c]) => {
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function showResultImage(result) {
  hideAllImages();
  if (result === 'X') winnerXImg.classList.add('visible');
  else if (result === 'O') winnerOImg.classList.add('visible');
  else if (result === 'draw') drawImg.classList.add('visible');
}

function hideAllImages() {
  [winnerXImg, winnerOImg, drawImg].forEach(img => img.classList.remove('visible'));
}

resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = Array(9).fill("");
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
  createBoard();
  hideAllImages();
});

createBoard();
