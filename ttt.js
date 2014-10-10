function Board() {
  this.rows = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
}

Array.prototype.uniq = function () {
  var uniqueArray = [];

  for (var i = 0; i < this.length; i++) {
    if (uniqueArray.indexOf(this[i]) === -1) {
      uniqueArray.push(this[i]);
    }
  }

  return uniqueArray;
};

Array.prototype.transpose = function () {
  var columns = [];
  for (var i = 0; i < this[0].length; i++) {
    columns.push([]);
  }

  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this[i].length; j++) {
      columns[j].push(this[i][j]);
    }
  }

  return columns;
};

Board.prototype.print = function () {
  this.rows.forEach(function (row) {
    console.log((row[0] || " ") + (row[1] || " ") + (row[2] || " "));
  });
};

Board.prototype.lines = function () {
  var rows = this.rows,
      cols = this.rows.transpose(),
      diags = [
        [this.rows[0][0], this.rows[1][1], this.rows[2][2]],
        [this.rows[2][0], this.rows[1][1], this.rows[0][2]]
      ];

  return rows.concat(cols).concat(diags);
}

Board.prototype.winner = function () {
  var winner = null;
  this.lines().forEach(function (line) {
    if (line[0] && line.uniq().length === 1) {
      winner = line[0];
    }
  });
  return winner;
}

Board.prototype.isGameOver = function () {
  return this.winner() || this.rows.every(function (row) {
    return row.indexOf(null) === -1;
  })
}

Board.prototype.move = function (player, row, col) {
  if (!(-1 < row && row < 3) || !(-1 < col && col < 3) || this.rows[row][col]) {
    return false;
  } else {
    this.rows[row][col] = player;
    return true;
  }
};

function Game(reader) {
  this.reader = reader;
  this.nextPlayer = "X";
};

Game.prototype.run = function (board) {
  board.print();

  if (board.isGameOver()) {
    if (board.winner()) {
      console.log(board.winner() + " wins!");
    } else {
      console.log("It's a draw.");
    }

    this.reader.close();
  } else {
    this.promptMove(function (row, col) {
      if (board.move(this.nextPlayer, row, col)){
        this.switchPlayers();
      } else {
        console.log("Invalid move!");
      }

      this.run(board);
    }.bind(this));
  }
};

Game.prototype.promptMove = function (callback) {
  console.log("It is " + this.nextPlayer + "'s turn.")
  reader.question("What is the row of your move? ", function (row) {
    reader.question("What is the column of your move? ", function (col) {
      callback(row, col);
    });
  });
};

Game.prototype.switchPlayers = function () {
  this.nextPlayer = (this.nextPlayer === "X" ? "O" : "X");
};


var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

g = new Game(reader);
g.run(new Board());
