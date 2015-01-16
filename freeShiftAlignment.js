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
  for (var i = 0; i <= length.length; ++i) {
    matrix.push([]);
  }
  return matrix;
}

function print(matrix){
  console.log(matrix);

  /*matrix.forEach(function(element, index){
    console.log(element);
  });*/
}

// Beispiel: SHOW ME ALL USER
//           USER
/*

 [
 [ [], [], ]
 []
 []
 []
 []
 []
 []
 []
 []
 []
 []
 []
 []
 ]


 */

var searchText = process.argv[2].toUpperCase();
var searchKey = process.argv[3].toUpperCase();

var gapPenalty = -1;
var correctAlignment = +1;

var scoreMatrix = createTwoDimensionalArray(searchKey); // two dimensional array
var scorePath = createTwoDimensionalArray(searchKey);

console.log("sentence: " + searchText);
console.log("search: " + searchKey);

for (var i = 0; i <= searchKey.length; ++i) { // rows
  if (i > 0) { // leftmost column
    scoreMatrix[i].push(gapPenalty * i);
    scorePath[i].push("u"); // up
  }
  else { // top left corner
    scoreMatrix[i].push(0);
    scorePath[i].push("d"); // diagonal
  }

  for (var j = 1; j <= searchText.length; ++j) { // columns
    if (i === 0) { // top row
      scoreMatrix[i].push(0);
      scorePath[i].push("l"); // left
    }
    else {
      var values = 0;
      if (searchKey[i] === searchText[j-1]) {
        values = [scoreMatrix[i - 1][j] + gapPenalty,
          scoreMatrix[i][j - 1] + gapPenalty,
          scoreMatrix[i - 1][j - 1] + correctAlignment];
        //console.log(values);
      }
      else {
        values = [scoreMatrix[i - 1][j] + gapPenalty,
          scoreMatrix[i][j - 1] + gapPenalty,
          scoreMatrix[i - 1][j - 1] - correctAlignment];
        //console.log(values);
      }

      var path = ["u", "l", "d"];
      scoreMatrix[i][j] = Math.max.apply(Math, values);

      var maxFromArray = Math.max.apply(Math, values);
      scorePath[i][j] = path[values.indexOf(maxFromArray)];
    }

    console.log(searchKey[i] + " = " + searchText[j-1] + " = " + scoreMatrix[i][j]);
  }
}


print(scoreMatrix);
print(scorePath);

// TODO: Traceback