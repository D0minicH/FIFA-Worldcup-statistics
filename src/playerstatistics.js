

d3.csv("./data/World_cup_2018_players_complete.csv").then(function(data) {

    var initialTeamPlayers = data.filter(function(d){return d.Team=="Argentina"})
    
    d3.select("#select-test")
    .append("text")
    .data(initialTeamPlayers)
    .text(function(d) {return initialTeamPlayers[0]["FullName"]});

    // Updates all values
  function updatePlayer(selectedPlayer) {

    var selectedTeamPlayer = data.filter(function(d){return d.FullName==selectedPlayer})   

    d3.select("#select-test")
      .data(selectedTeamPlayer)
      .text(function(d) {
        return (selectedTeamPlayer[0]["Photo"]);
      });

    }

  // When the button is changed, run the updateChart function
  d3.select("#select-player-button-left").on("change", function(d) {
      var selectedOption = d3.select(this).property("value")
      updatePlayer(selectedOption)
  })
});
