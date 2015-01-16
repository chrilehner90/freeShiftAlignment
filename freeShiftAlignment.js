/*
 Algorithms for the Social Web, Task 7
 Wanko, Lehner
 */


try {
  if (process.argv[2] === undefined || process.argv[3] === undefined) {
    throw "\nNo or not all arguments given."
  }
}
catch (err) {
  console.log(err + "\n\tUsage: node [scriptname] [sentence] [searchKey]\n");
  process.exit(1); // failure
}

function createTwoDimensionalArray(length) {
  var matrix = []
  for (var i = 0; i < length.length; ++i) {
    matrix.push([]);
  }
  return matrix;
}

var searchText = process.argv[2].toUpperCase();
var searchKey = process.argv[3].toUpperCase();

var gapPenalty = -1;
var correctAlignment = +1;

var scoreMatrix = createTwoDimensionalArray(searchText); // two dimensional array
var scorePath = [];


console.log("sentence: " + searchText);
console.log("search: " + searchKey);

for (var i = 0; i < searchKey.length - 1; ++i) { // rows
  if (i > 0) { // leftmost column
    scoreMatrix.push(gapPenalty * i)
    scorePath.push("u"); // up
  }
  else { // top left corner
    scoreMatrix.push(0);
    scorePath.push("d"); // diagonal
  }

  for (var j = 0; j < searchText.length; ++j) { // columns
    if (i === 0) { // top row
      scoreMatrix.push(0);
      scorePath.push("l"); // left
    }
    else {
      var values = 0;
      if (searchKey[i] === searchText[j]) {
        values = [scoreMatrix[i - 1][j] + gapPenalty,
          scoreMatrix[i][j - 1] + gapPenalty,
          scoreMatrix[i - 1][j - 1] - correctAlignment];
      }
      else {
        values = [scoreMatrix[i - 1][j] + gapPenalty,
          scoreMatrix[i][j - 1] + gapPenalty,
          scoreMatrix[i - 1][j - 1] + correctAlignment];
      }

      // push highest value
      // scoreMatrix[i].push();
      // find out from which direction we came

    }
  }
}

// TODO: Traceback
