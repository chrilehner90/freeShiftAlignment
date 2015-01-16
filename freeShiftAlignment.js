process.argv.forEach(function(val, index, array) {
  console.log(index + ": " + val)
})

var searchText = process.argv[2].toLowerCase();
var searchKey = process.argv[3].toLowerCase();
var gapPenalty = -1;

var scoreMatrix = [];
var scorePath = [];


console.log("sentence: " + searchText);
console.log("search: " + searchKey);



