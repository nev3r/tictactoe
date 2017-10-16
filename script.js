function chooseSide() {
  document.winner = null;
  var side = prompt("Type a X or O and press OK",'type "X" or "O" here');
  clearAll();
  setMessage("Make a move");
  if (side == "X" || side == "x") {
    document.turn = side.toUpperCase();
  } else if (side == "O" || side == "o") {
    document.turn = side.toUpperCase();

    aiMove("X");
  } else {
    alert('Invalid entry. Please enter either letter X or letter O')
    chooseSide();
  }
}

function setMessage(msg) {
  document.getElementById("message").innerText = msg;
}

function aiMove(element) {
  if (document.winner == null) {
    if (element == "X") {
      move = generateMove();
      document.getElementById("s" + move).innerText = "X";
    } else {
      var move = generateMove();
      if (getBox(move) == "") {
        document.getElementById("s" + move).innerText = document.turn;
        if (checkForWinner(document.turn)) {
          setMessage("Computer has won the game!");
          document.winner = document.turn;
        } else if (checkForDraw()) {
          document.winner = "None";
          setMessage("Draw Game!")
        } else if (document.turn == "X") {
          document.turn = "O";
        } else {
          document.turn = "X";
        }
      } else {
        aiMove();
      }
    }
  }
}

function generateMove() {
  return Math.floor(Math.random() * 9) + 1;
}

function nextMove(square) {
  if (document.winner == "None") {
    setMessage("Draw Game!");
  } else if (document.winner != null) {
    setMessage(document.winner + " already won the game!");
  } else if (square.innerText == "") {
    square.innerText = document.turn;
    if (checkForWinner(document.turn)) {
      document.winner = document.turn;
      setMessage('You have won the game');
    } else if (checkForDraw()) {
      document.winner = "None";
      setMessage("Draw Game!");
    } else if (!checkForDraw()) {
      switchTurn();
    }
  } else {
    setMessage('That square was already used');
  }
}

function switchTurn() {
  if (checkForWinner(document.turn)) {
    setMessage("Congratulations you have won!");
    document.winner = document.turn;
  } else if (document.turn == "X") {
    document.turn = "O";
    aiMove();
  } else {
    document.turn = "X";
    aiMove();
  }
}

function checkForDraw() {
  for (var i = 1; i <= 9; i++) {
    if (getBox(i) == "") {
      return false;
    }
  }
  return true;
}

function checkRow(a, b, c, move) {
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
    result = true;
  }
  return result;
}

function checkForWinner(move) {
  if (checkRow(1, 2, 3, move) || checkRow(4, 5, 6, move) || checkRow(7, 8, 9, move) || checkRow(1, 4, 7, move) || checkRow(2, 5, 8, move) || checkRow(3, 6, 9, move) || checkRow(1, 5, 9, move) || checkRow(3, 5, 7, move)) {
    return true;
  };
  return false;
}

function getBox(number) {
  return document.getElementById("s" + number).innerText;
}

function clearAll() {
  for (var i = 1; i <= 9; i++) {
    document.getElementById("s" + i).innerText = "";
  }
}
