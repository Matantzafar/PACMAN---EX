"use strict";

const WALL = "#";
const FOOD = ".";
const EMPTY = " ";
const CHERRY = "🍒";
const SUPER_FOOD = "🥩";

// Model
const gGame = {
  score: 0,
  isOn: false,
};
var gBoard;
var gFoodCounter;
var gScore = 0;
var gCherryInterval;

function onInit() {
  gFoodCounter = -4;
  updateScore(0);
  gBoard = buildBoard();
  createGhosts(gBoard);
  createPacman(gBoard);
  renderBoard(gBoard);
  gCherryInterval = setInterval(cherryPop, 15000);
  gGame.isOn = true;

}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
        gFoodCounter--;
      }
    }
  }
  board[1][1] = SUPER_FOOD;
  board[1][8] = SUPER_FOOD;
  board[8][1] = SUPER_FOOD;
  board[8][8] = SUPER_FOOD;

  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += "</tr>";
  }
  const elContainer = document.querySelector(".board");
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function updateScore(diff) {
  if (!diff) {
    gGame.score = 0;
  } else {
    gGame.score += diff;
  }
  document.querySelector("span.score").innerText = gGame.score;
}

function checkVictory() {
  if (gFoodCounter !== gGame.score) return;
  endGame("GREAT JOB, YOU DID IT!");
}

function endGame(msg) {
  const elModalH3 = document.querySelector(".modal h3");
  elModalH3.innerText = msg;
  showModal();
  clearInterval(gIntervalGhosts);
  clearInterval(gCherryInterval);
  gGame.isOn = false;
}

function gameOver() {
  renderCell(gPacman.location, "🪦");
  endGame("BETTER LUCK NEXT TIME");
}

function superMode (){
  gPacman.isSuper = true
  gRemovedGhosts = []
  setTimeout(() => {
    gPacman.isSuper = false
    gGhosts = gGhosts.concat(gRemovedGhosts)
}, 5000)
}

function cherryPop() {
  const empCell = getEmptyCell()
  if(!empCell) return
  gBoard[empCell.i][empCell.j] = CHERRY
    renderCell(empCell, CHERRY)
    gFoodCounter += 10
}

function showModal() {
  const elModal = document.querySelector('.modal')
  elModal.classList.remove('hide')
}

function hideModal() {
  const elModal = document.querySelector('.modal')
  elModal.classList.add('hide')
}
