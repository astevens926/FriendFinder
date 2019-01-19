
var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    var newData = req.body;
    var newScores = newData.choices;

    var bestFriend = {
      name: "",
      compatability: 100
    }

    var currentDifference;

    for(var i = 0; i < friends.length; i++){
      currentDifference = 0;

      for (var j = 0; j < friends[i].choices.length; j++) {

        currentDifference += Math.abs(parseInt(newScores[j]) - parseInt(friends[i].choices[j]));
      }

      if(currentDifference<bestFriend.compatability) {
        bestFriend.name = friends[i].name;
        bestFriend.compatability = currentDifference;
      }

    }

    friends.push(newData);
    res.json(bestFriend);

  });

};
