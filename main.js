let game = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let player = 1;

let gameOver = false;

function setup() {
  document.querySelector("#game").classList.remove("over");

  // Reset game
  game = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // Reset cells
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("occupied");
  });

  // Reset winner
  document.querySelector(".winner").innerHTML = "";
  gameOver = false;

  // Reset player
  player = 1;
}

const gameOverAudio = document.querySelector("#gameover");

function checkWinner() {
  game.forEach((row) => {
    let player1Points = 0;
    let player2Points = 0;

    row.forEach((cell) => {
      if (cell === 1) player1Points++;
      if (cell === 2) player2Points++;
    });

    if (player1Points === 3) {
      gameOver = true;
      document.querySelector("#game").classList.add("over");
      document.querySelector(".winner").innerHTML = "Player 1 won";
    }

    if (player2Points === 3) {
      gameOver = true;
      document.querySelector("#game").classList.add("over");
      document.querySelector(".winner").innerHTML = "Player 2 won";
    }
  });

  // Vertical
  for (let i = 0; i < 3; i++) {
    let player1Points = 0;
    let player2Points = 0;
    for (let j = 0; j < 3; j++) {
      if (game[j][i] === 1) player1Points++;
      if (game[j][i] === 2) player2Points++;
    }

    if (player1Points === 3) {
      gameOver = true;
      document.querySelector("#game").classList.add("over");
      document.querySelector(".winner").innerHTML = "PLAYER 1 WON";
    }

    if (player2Points === 3) {
      gameOver = true;
      document.querySelector("#game").classList.add("over");
      document.querySelector(".winner").innerHTML = "PLAYER 2 WON";
    }
  }

  // Diagonal
  let player1Points = 0;
  let player2Points = 0;
  for (let i = 0; i < 3; i++) {
    if (game[i][i] === 1) player1Points++;
    if (game[i][i] === 2) player2Points++;
  }

  if (player1Points === 3) {
    gameOver = true;
    document.querySelector("#game").classList.add("over");
    document.querySelector(".winner").innerHTML = "PLAYER 1 WON";
  }

  if (player2Points === 3) {
    gameOver = true;
    document.querySelector("#game").classList.add("over");
    document.querySelector(".winner").innerHTML = "PLAYER 2 WON";
  }

  player1Points = 0;
  player2Points = 0;

  // Opposite diagonal

  for (let i = 0; i < 3; i++) {
    if (game[i][2 - i] === 1) player1Points++;
    if (game[i][2 - i] === 2) player2Points++;
  }

  if (player1Points === 3) {
    gameOver = true;
    document.querySelector("#game").classList.add("over");
    document.querySelector(".winner").innerHTML = "PLAYER 1 WON";
  }

  if (player2Points === 3) {
    gameOver = true;
    document.querySelector("#game").classList.add("over");
    document.querySelector(".winner").innerHTML = "PLAYER 2 WON";
  }

  if (gameOver) {
    gameOverAudio.play();
  }
}

function play(row, col) {
  if (game[row - 1][col - 1] === 0 && !gameOver) {
    const cell = document.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"]`
    );

    /*     document.querySelector("#click").play();
     */
    cell.animate([{ opacity: 0 }, { opacity: 1 }], 200);
    cell.innerHTML = player === 1 ? "X" : "O";
    game[row - 1][col - 1] = player;
    cell.classList.add("occupied");
    player = player === 1 ? 2 : 1;
  }
  checkWinner();
}

document.querySelector("#reset").addEventListener("click", () => {
  setup();
});

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    play(cell.dataset.row, cell.dataset.col);
    if (document.querySelectorAll(".occupied").length === 9) {
      checkWinner();
      gameOver = true;
      document.querySelector("#game").classList.add("over");
      document.querySelector(".winner").innerHTML = "DRAW";
      document.querySelector("#draw").play();
      gameOverAudio.play();
    }
  });
});
