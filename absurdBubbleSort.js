var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var askIfLessThan = function (el1, el2, callback) {
  reader.question("Is " + el1 + " < " + el2 + "?", function (answer) {
    if (answer === "yes") {
      callback(true);
    } else {
      callback(false);
    }
  });
};

var innerBubbleSortLoop = function (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfLessThan(arr[i], arr[i + 1], function (answer) {
      if (!answer) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      }

      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop)
    })
  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

var absurdBubbleSort = function (arr, sortCompletionCallback) {
  var outerBubbleSortLoop = function (madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});