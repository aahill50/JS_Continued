var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame(size) {
  this.stacks = [[],[],[]];
  this.size = size;

  for (var i = size; i > 0; i--) {
    this.stacks[0].push(i);
  };
};

HanoiGame.prototype.isWon = function () {
  return this.stacks[1].length === this.size ||
         this.stacks[2].length === this.size;
};

HanoiGame.prototype.isValidMove = function (from, to) {
  var fromStack = this.stacks[from],
      toStack   = this.stacks[to];
  return fromStack && toStack && (fromStack.length > 0) &&
    (toStack.length === 0 ||
     fromStack[fromStack.length - 1] < toStack[toStack.length - 1]);
};

HanoiGame.prototype.move = function (from, to) {
  if (this.isValidMove(from, to)) {
    this.stacks[to].push(this.stacks[from].pop());
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function (callback) {
  reader.question("Where would you like to move from? ", function (from) {
    reader.question("Where would you like to move to? ", function (to) {
      callback(from, to);
    });
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  this.print();
  this.promptMove(function (from, to) {
    if (!this.move(from, to)) {
      console.log("Invalid move!");
    }
    if (this.isWon()) {
      completionCallback();
      reader.close();
    } else {
      this.run(completionCallback);
    }
  }.bind(this));
};

h = new HanoiGame(3);
h.run(function () {
  console.log("You WON!");
});