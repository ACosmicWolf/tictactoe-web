const getBlockMiddle = (col) => {
  return 40 + (80 + 3) * col;
};

let game = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let player = 1;

let gameOver = false;

const gameOverAudio = document.querySelector("#gameover");

function setup() {
  document.querySelector("#game").classList.remove("over");

  // Reset game
  game = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // Reset cells
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("occupied");
  });

  document.querySelector(".winner").innerHTML = "";
  gameOver = false;

  player = 1;
  document.querySelectorAll(".line").forEach((line) => {
    line.remove();
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

  /*  checkWinner();

  if (!gameOver) {
    // Reset winner
    document.querySelector(".winner").innerHTML = "";
    gameOver = false;
  }

  document.querySelectorAll(".row").forEach((row, rowIndx) => {
    row.querySelectorAll(".cell").forEach((cell, colIndx) => {
      cell.innerHTML =
        game[rowIndx][colIndx] === 0
          ? ""
          : game[rowIndx][colIndx] === 1
          ? "X"
          : "O";
      cell.classList.remove("occupied");
    });
  }); */
}

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

    if (player1Points === 3 || player2Points === 3) {
      game.map((row, rowIndx) => {
        console.log(row);
        if (
          (row[0] === 1 && row[1] === 1 && row[2] === 1) ||
          (row[0] === 2 && row[1] === 2 && row[2] === 2)
        ) {
          linedraw(6, getBlockMiddle(rowIndx), 240, getBlockMiddle(rowIndx));
        }
      });
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

    if (player1Points === 3 || player2Points === 3) {
      for (let i = 0; i < 3; i++) {
        if (
          (game[0][i] === 1 && game[1][i] === 1 && game[2][i] === 1) ||
          (game[0][i] === 2 && game[1][i] === 2 && game[2][i] === 2)
        ) {
          linedraw(getBlockMiddle(i), 6, getBlockMiddle(i), 240);
        }
      }
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
    linedraw(6, 6, 240, 240);
  }

  if (player2Points === 3) {
    gameOver = true;
    document.querySelector("#game").classList.add("over");
    document.querySelector(".winner").innerHTML = "PLAYER 2 WON";
    linedraw(6, 6, 240, 240);
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
    linedraw(246, 0, 0, 246);
  }

  if (player2Points === 3) {
    gameOver = true;
    document.querySelector("#game").classList.add("over");
    document.querySelector(".winner").innerHTML = "PLAYER 2 WON";
    linedraw(246, 0, 0, 246);
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

function linedraw(x1, y1, x2, y2) {
  if (x2 < x1) {
    var tmp;
    tmp = x2;
    x2 = x1;
    x1 = tmp;
    tmp = y2;
    y2 = y1;
    y1 = tmp;
  }

  var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var m = (y2 - y1) / (x2 - x1);

  var degree = (Math.atan(m) * 180) / Math.PI;

  document.querySelector("#game").innerHTML +=
    "<div class='line' style='transform-origin: top left; transform: rotate(" +
    degree +
    "deg); width: " +
    lineLength +
    "px; height: 4px; background: black; position: absolute; top: " +
    y1 +
    "px; left: " +
    x1 +
    "px;'></div>";
}

setup();

document.querySelector("#reset").addEventListener("click", () => {
  setup();
});
