// tic tac toe

// Grab the HTML elements for the game
const board = document.getElementById("board");
const player1 = document.querySelector(".js-player-1");
const player2 = document.querySelector(".js-player-2");
const endMessageDiv = document.querySelector(".js-end-message");
const restartBtn = document.querySelector(".restart");

// this array tracks the state of the game board.
const game = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // the 9 cells

// Game Settings
const PLAYER_1_ICON = "X";
const PLAYER_2_ICON = "O";
let COUNTER = 0; // track game progress

// game starts with player 1
let currentPlayer = "1";
player1.classList.add("active");

const handleRestart = () => {
  // reload the page
  window.location.reload();
};

const toggleRestartBtn = () => {
  restartBtn.disabled = false;
};

const win = () => {
  // stop board from being clickable
  board.removeEventListener("click", handleClick);

  // print the winner to the screen
  endMessageDiv.innerHTML = `The winner is ${currentPlayer}`;

  // activate the restart btn - toggleRestartBtn()
  toggleRestartBtn();
};

const draw = () => {
  // stop board from being clickable
  board.removeEventListener("click", handleClick);

  // print the winner to the screen
  endMessageDiv.innerHTML = "The game is a draw!";

  // activate the restart btn - toggleRestartBtn()
  toggleRestartBtn();
};

// Use the game array to determine the winner.
const verifyWin = () => {
  if (
    // rows
    (game[0] === game[1] && game[0] === game[2]) ||
    (game[3] === game[4] && game[3] === game[5]) ||
    (game[6] === game[7] && game[6] === game[8]) ||
    // columns
    (game[0] === game[3] && game[0] === game[6]) ||
    (game[1] === game[4] && game[1] === game[7]) ||
    (game[2] === game[5] && game[2] === game[8]) ||
    // diagonals
    (game[0] === game[4] && game[0] === game[8]) ||
    (game[2] === game[4] && game[2] === game[6])
  ) {
    win();
  } else if (COUNTER === 9) {
    draw();
  }
};

// use .active to show active player visually...
const togglePlayer = () => {
  if (currentPlayer === "1") {
    currentPlayer = "2";
  } else {
    currentPlayer = "1";
  }

  player1.classList.toggle("active");
  player2.classList.toggle("active");
};

const handleClick = (event) => {
  // get the ID of the cell we clicked on
  const cell = event.target.id;

  // using the ID of the cell, retrieve the HTML element
  const currentCellDiv = document.getElementById(cell);

  // grabbing the number of the cell
  const cellId = cell.charAt(cell.length - 1);

  // CONDITION ? RETURN IF TRUE : RETURN IF FALSE
  const icon = currentPlayer === "1" ? PLAYER_1_ICON : PLAYER_2_ICON;

  // if cell is empty, add player icon + toggle player
  if (typeof game[cellId] === "number") {
    currentCellDiv.innerText = icon;

    game[cellId] = icon;

    ++COUNTER;

    verifyWin();
    togglePlayer();
  }
};

board.addEventListener("click", handleClick);
restartBtn.addEventListener("click", handleRestart);
