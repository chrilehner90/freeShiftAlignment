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

var sentences = ["Find all friends who recently bought a pet and subsequently changed their relationship status.",
  "Find all friends who have more friends than me.",
  "How many friends of friends do I have?",
  "Find people who like Das Kino or Mozartkino.",
  "Find people who like The Shawshank Redemption.",
  "Show me all companies which employ programmers near Salzburg!",
  "Show me all people that I know who own more than a million euros!",
  "Who of my friends are planning to attend a rock festival this year?",
  "Who of my friends own a car in Salzburg?",
  "Who of my friends play the same video games as I do?",
  "Which friends will go out drinking today",
  "Friends who likes drawing",
  "Friends who play club football",
  "Friends that are in university",
  "Horny girls in my neighborhod",
  "Get a list of people who like the movie „This is Spinal Tap“",
  "Get a list of people who live in the same city as I, but do not have common friends.",
  "Get a list of friends who did not wrote a facebook status since 1 month.",
  "Get a friend who shares with me the greatest amount of the same like pages.",
  "Get a list of friends who recently changed their relationship status.",
  "Friends who likes FC Bayern Munich",
  "Friends who play in a brass band",
  "People who loves rib eye steaks medium-rare",
  "People who live nearby and go fishing",
  "Friends who ever won more than 10.000 euros",
  "Mothers who like Bacon.",
  "Married people who like Prostitutes.",
  "Current employees of Google who like horses.",
  "Single women who live nearby and who are interested in men and like Getting Drunk.",
  "People who like Curry.",
  "People who like pizza",
  "Friends who use Instagram",
  "Friends who have visited Bangkok",
  "Friends of my Friends who live in Salzburg",
  "Single women under 30 who live in Salzburg",
  "Show me my friends pictures on mountains!",
  "What restaurants do my friends in San Diego like?",
  "Who of my friends works as an electrician?",
  "Show me all pictures of my friends at the Nova Rock last year!",
  "What schools have my friends from Villach been at?",
  "Does anyone own a pogostick?",
  "List all my friend's friends that are not in a relationship and live near Salzburg!",
  "Who of my friends went to a music festival this year?",
  "Show me all pictures of drunk friends!",
  "Who is working as an engineer?",
  "People who play guitar.",
  "Bands which my friends have seen live.",
  "Places my friends have visited last week.",
  "Movies my friends saw and didn’t like.",
  "Ex-girlfriends who are in a new relationship.",
  "Friends of friends of my friends who study at the university of applied science",
  "Restaurants nearby that I and at least one of my friends have been to",
  "Photos from 1989 to 2014 I liked",
  "Videos recorded by my friends in my hometown",
  "Current employers of people who like racism"
];

var gapPenalty = -1;
var correctAlignment = +1;

for (var i = 0; i < sentences.length; i++) {
  for (var j = 0; j < identifiers.length; j++) {
    var sentence = sentences[i].toUpperCase().replace(/\/+/g, " ").replace(/(_)+/g, " ");
    var identifier = identifiers[j].toUpperCase().replace(/\/+/g, " ").replace(/(_)+/g, " ");

    var alignment = getAlignment(sentence, identifier);
    if (alignment) {
      console.log(alignment[0]);
      console.log(alignment[1]);
      console.log("================================================================================");
    }
  }
}

function createTwoDimensionalArray(length) {
  var matrix = []
  for (var i = 0; i <= length.length; ++i) {
    matrix.push([]);
  }
  return matrix;
}

function getAlignment(searchText, searchKey) {
  var scoreMatrix = createTwoDimensionalArray(searchKey);
  var scorePath = createTwoDimensionalArray(searchKey);

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

  var maxValue = Math.max.apply(Math, scoreMatrix[scoreMatrix.length - 1]);
  var maxValueIdx = scoreMatrix[scoreMatrix.length - 1].indexOf(maxValue);

  if (maxValue >= searchKey.length * (2 / 3)) {
    var i = searchKey.length;
    var j = maxValueIdx

    var alignment = ["", ""];
    for (var k = 0; k < searchText.length - j; ++k) {
      alignment[0] += "-";
    }
    alignment[1] = searchText.slice(j);
    alignment[2] = maxValue;

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

    return alignment;
  }
  else {
    return null;
  }
}