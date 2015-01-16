try {
  if(process.argv[2] === undefined || process.argv[3] === undefined) {
    throw "\nNo or not all arguments given:"
  }
  else if()
}
catch(err) {
  console.log(err + "\n\tUsage: node [scriptname] [sentence] [searchKey]\n");
  process.exit(1); // failure
}

var searchText = process.argv[2].toUpperCase();
var searchKey = process.argv[3].toUpperCase();

var gapPenalty = -1;

var scoreMatrix = [];
var scorePath = [];


console.log("sentence: " + searchText);
console.log("search: " + searchKey);

for(var i = 0; i < searchText.length - 1; i++) {

}
