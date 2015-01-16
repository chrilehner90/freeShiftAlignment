/*
Algorithms for the Social Web, Task 7
Wanko, Lehner
 */


try {
  if(process.argv[2] === undefined || process.argv[3] === undefined) {
    throw "\nNo or not all arguments given."
  }
}
catch(err) {
  console.log(err + "\n\tUsage: node [scriptname] [sentence] [searchKey]\n");
  process.exit(1); // failure
}

function createTwoDimensionalArray(length) {
  var matrix = []
  for(var i = 0; i < length.length; ++i) {
    matrix.push([]);
  }
  return matrix;
}

var searchText = process.argv[2].toUpperCase();
var searchKey = process.argv[3].toUpperCase();

var gapPenalty = -1;

var scoreMatrix = createTwoDimensionalArray(searchText); // two dimensional array
var scorePath = [];


console.log("sentence: " + searchText);
console.log("search: " + searchKey);

for(var i = 0; i < searchKey.length - 1; ++i) {
  if(i != 0) {
    scoreMatrix.push(gapPenalty * i);
    scorePath.push("up");
  }
  else {

  }
}
