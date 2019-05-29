d3.csv("./data/World_cup_2018_players_complete.csv").then(function(data) {
  
  window.initialiseFirstPlayerOnTeamChange = function(selectedTeam, direction) {
    console.log("Say Hello: " + selectedTeam);

    var initialTeamPlayers = data.filter(function(d) {
      return d.Team == selectedTeam;
    });

  //  var highestRating = d3.max(initialTeamPlayers, function(d) { return d.Rating; });

  //  var topPlayer = initialTeamPlayers.filter(function(d) {
  //    if(d.Rating == highestRating)
  //   return d.FullName
  // });

  // console.log("TopPlayer: "+topPlayer);


    var updateSelectTest = d3.selectAll("#select-test")
          .data(initialTeamPlayers)
        
    updateSelectTest.exit().remove();

    updateSelectTest.enter()
      .append("text")
      .merge(updateSelectTest)
      .text(function(d) {
        return initialTeamPlayers[0]["Club"];
      });
  };

  // Updates all values
  function updatePlayer(selectedPlayer) {
    var selectedTeamPlayer = data.filter(function(d) {
      return d.FullName == selectedPlayer;
    });

    d3.select("#select-test")
      .data(selectedTeamPlayer)
      .attr("class", "test-text")
      .text(function(d) {
        return selectedTeamPlayer[0]["Club"];
      });
  }
  window.initialiseFirstPlayerOnTeamChange("Argentina")

  // When the button is changed, run the updateChart function
  d3.select("#select-player-button-left").on("change", function(d) {
    var selectedOption = d3.select(this).property("value");
    updatePlayer(selectedOption);
  });
});
