/*
 Algorithms for the Social Web, Task 7
 Wanko, Lehner
 */

var identifiers = [
  "about",
  "age_range",
  "bio",
  "birthday",
  "/mutual_friends",
  "/mutual_likes",
  "cover",
  "user_currency",
  "usd_exchange",
  "usd_exchange_inverse",
  "currency_offset",
  "devices",
  "hardware",
  "os",
  "education",
  "school",
  "year",
  "concentration",
  "type",
  "email",
  "favorite_athletes",
  "favorite_teams",
  "first_name",
  "gender",
  "hometown",
  "inspirational_people",
  "is_verified",
  "languages",
  "last_name",
  "link",
  "locale",
  "location",
  "middle_name",
  "name",
  "political",
  "quotes",
  "relationship_status",
  "religion",
  "significant_other",
  "timezone",
  "verified",
  "website",
  "work",
  "employer",
  "location",
  "position",
  "start_date",
  "end_date",
  "projects",
  "with",
  "description",
  "start_date",
  "end_date",
  "/accounts",
  "/achievements",
  "/activities",
  "/adaccounts",
  "/albums",
  "/applications/developer",
  "/apprequests",
  "/books",
  "/events",
  "/events/attending",
  "/events/created",
  "/events/maybe",
  "/events/not_replied",
  "/events/declined",
  "/family",
  "/feed",
  "/friendlists",
  "/friends",
  "/games",
  "/groups",
  "/interests",
  "/invitable_friends",
  "/likes",
  "/links",
  "/movies",
  "/music",
  "/notifications",
  "/outbox",
  "/payment_transactions",
  "/payments",
  "/picture",
  "/photos",
  "/photos/uploaded",
  "/pokes",
  "/posts",
  "/scores",
  "/statuses",
  "/taggable_friends",
  "/tagged",
  "/tagged_places",
  "/television",
  "/videos",
  "/videos/uploaded"
];

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

      if (searchKey[i - 1] === searchText[j - 1]) {
        values = [scoreMatrix[i - 1][j] + gapPenalty,
          scoreMatrix[i][j - 1] + gapPenalty,
          scoreMatrix[i - 1][j - 1] + correctAlignment];
      }
      else {
        values = [scoreMatrix[i - 1][j] + gapPenalty,
          scoreMatrix[i][j - 1] + gapPenalty,
          scoreMatrix[i - 1][j - 1] - correctAlignment];
      }

      var path = ["u", "l", "d"];
      scoreMatrix[i][j] = Math.max.apply(Math, values);

      var maxFromArray = Math.max.apply(Math, values);
      scorePath[i][j] = path[values.indexOf(maxFromArray)];
    }
  }
}

console.log(scoreMatrix);
console.log(scorePath);

var maxValue = Math.max.apply(Math, scoreMatrix[scoreMatrix.length - 1]);
var maxValueIdx = scoreMatrix[scoreMatrix.length - 1].indexOf(maxValue);

var i = searchKey.length;
var j = maxValueIdx

var alignment = ["", ""];
for (var k = 0; k < searchText.length - j; ++k) {
  alignment[0] += "-";
}
alignment[1] = searchText.slice(j);

while (i > 0 || j > 0) {
  if (scorePath[i][j] == "d") {
    i--;
    j--;
    alignment[0] = searchKey[i] + alignment[0];
    alignment[1] = searchText[j] + alignment[1];
  } else if (scorePath[i][j] == "u") {
    i--;
    alignment[0] = searchKey[i] + alignment[0];
    alignment[1] = "-" + alignment[1];
  } else if (scorePath[i][j] == "l") {
    j--;
    alignment[0] = "-" + alignment[0];
    alignment[1] = searchText[j] + alignment[1];
  }
}

console.log(alignment[0]);
console.log(alignment[1]);