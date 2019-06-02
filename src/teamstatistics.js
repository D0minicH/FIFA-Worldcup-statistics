
var marginFlag = { top: 0, right: 0, bottom: 0, left: 0 },
  widthFlag = 100 - marginFlag.left - marginFlag.right,
  heightFlag = 50 - marginFlag.top - marginFlag.bottom;

var marginLogo = { top: 0, right: 0, bottom: 0, left: 0 },
  widthLogo = 80 - marginLogo.left - marginLogo.right,
  heightLogo = 50 - marginLogo.top - marginLogo.bottom;

//Dimensions and margins Bar Chart
var marginTeamBar = { top: 0, right: 0, bottom: 10, left: 0 },
  widthTeamBar = 400 - marginTeamBar.left - marginTeamBar.right,
  heightTeamBar = 500 - marginTeamBar.top - marginTeamBar.bottom;

//Dimensions barAxis (Y)
var marginBarAxis = { top: 0, right: 50, bottom: 0, left: 50 },
  widthBarAxis = 200 - marginBarAxis.left - marginBarAxis.right,
  heightBarAxis = 500 - marginBarAxis.top - marginBarAxis.bottom;

//Dimensions for the Piechart
var widthPie = 180;
heightPie = 180;
marginPie = 0;
radius = Math.min(widthPie, heightPie) / 2 - marginPie;
tau = 2 * Math.PI,
progress = 0,
total = 100,
formatPercent = d3.format(".0%");

function generateCanvas(direction) {
    var flagCanvasId = "team-flag-" + String(direction);
    var logoCanvasId = "team-logo-" + String(direction);
    var teamBarChartCanvasId = "team-barchart-"  + String(direction);
    var possessionPieCanvasId = "possession-pie-" + String(direction);
   

    window["flagCanvas" + direction] = d3
        .select("#" + flagCanvasId)
        .append("svg")
        .attr("width", widthFlag + marginFlag.left + marginFlag.right)
        .attr("height", heightFlag + marginFlag.top + marginFlag.bottom)
        .append("g")
        .attr("transform", "translate(" + marginFlag.left + "," + marginFlag.top + ")");

    window["logoCanvas" + direction] = d3
        .select("#" + logoCanvasId)
        .append("svg")
        .attr("width", widthLogo + marginLogo.left + marginLogo.right)
        .attr("height", widthLogo + marginLogo.top + marginLogo.bottom)
        .append("g")
        .attr("transform", "translate(" + marginLogo.left + "," + marginLogo.top + ")");

    window["teamBarChartCanvas" + direction] = d3
        .select("#" + teamBarChartCanvasId)
        .append("svg")
        .attr("width", widthTeamBar + marginTeamBar.left + marginTeamBar.right)
        .attr("height", heightTeamBar + marginTeamBar.top + marginTeamBar.bottom)
        .append("g")
        .attr("transform", "translate(" + marginTeamBar.left + "," + marginTeamBar.top + ")");

    window["possessionPieCanvas" + direction] = d3
        .select("#" + possessionPieCanvasId)
        .append("svg")
        .attr("width", widthPie)
        .attr("height", heightPie)
        .append("g")
        .attr("transform", "translate(" + widthPie / 2 + "," + heightPie / 2 + ")");
}
generateCanvas("left");
generateCanvas("right");

var teamBarChartAxis = d3
  .select("#team-barchart-axis")
  .append("svg")
  .attr("width", widthBarAxis + marginBarAxis.left + marginBarAxis.right)
  .attr("height", heightBarAxis + marginBarAxis.top + marginBarAxis.bottom)
  .append("g")
  .attr("transform", "translate(" + marginBarAxis.left + "," + marginBarAxis.top + ")");

//TeamBarChart Middle Axis
teamBarChartAxis
  .selectAll("axislabels")
  .data([
    "Matches played",
    "Goals scored",
    "Goals against",
    "Shots",
    "Shots on target",
    "Penalties",
    "Offsides",
    "Corners",
    "Fouls committed",
    "Fouls suffered",
    "Yellow cards",
    "Red cards"
  ])
  .enter()
  .append("text")
  .attr("x", 50)
  .attr("y", function(d, i) { return 30 + i * 39.8; })
  .text(function(d) { return d; })
  .attr("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .style("font-size", "18.72px")
  .style("font-weight", "bold");
  
//Find index of searched Player in given Array
 function findIndex(teamArray, topPlayerName){
        for (i = 0; i < teamArray.length; i++){
          if(teamArray[i].Player == topPlayerName){
            return i;
          }
        }
      }

//Read the data
Promise.all([
  d3.csv("./data/wc_teams_infos.csv"),
  d3.csv("./data/wc_team_stats.csv"),
  d3.csv("./data/World_cup_2018_players_complete.csv")
]).then(function(data) {

  //map with all team names
  var allteams = d3.map(data[1], function(d) { return d.country; }).keys();

  //initialise both sides
   initialiseParts("left", 10);
   initialiseParts("right", 6);

  function generateDivIds(direction){
    divIdSet = [];
    //div id names for left & right side
    var selectTeamDropdownId = "select-team-button-" + String(direction);
    var flagId = "flag-" + String(direction);
    var logoId = "logo-" + String(direction);
    var finalPlacementId = "final-placement-" + String(direction);
    var teamMarketValueId = "market-value-" + String(direction);
    var selectPlayerDropdownId = "select-player-button-" + String(direction);

    divIdSet.push(selectTeamDropdownId)
    divIdSet.push(flagId)
    divIdSet.push(logoId)
    divIdSet.push(finalPlacementId)
    divIdSet.push(teamMarketValueId)
    divIdSet.push(selectPlayerDropdownId)

    return divIdSet;
  }
  
  function initialiseParts(direction, startIndex) {
    
    generateDivIds(direction);

    // Dropdown-Select Team
    d3.select("#" + divIdSet[0])
      .selectAll("myOptions")
      .data(data[0])
      .enter()
      .append("option")
      .text(function(d) { return d.country; }) // text showed in the menu
      .attr("value", function(d) { return d.country; })
      .attr("data-icon", function(d) { return d.flag});

      d3.select("#" + divIdSet[0]).property("selectedIndex", startIndex);
   
    //Flag
    window["flagCanvas" + direction]
      .append("image")
      .data(data)
      .attr("id", divIdSet[1])
      .attr("xlink:href", function(d) { return data[0][startIndex]["flag"]; })
      .attr("width", 100)
      .attr("height", 50);

    //Logo
    window["logoCanvas" + direction]
      .append("image")
      .data(data)
      .attr("id", divIdSet[2])
      .attr("xlink:href", function(d) { return data[0][startIndex]["team-logo"]; })
      .attr("height", 80)
      .attr("width", 80);

    d3.select("#" + divIdSet[3])
      .append("text")
      .data(data)
      .text(function(d) { return data[0][startIndex]["final_placement"]; });

    d3.select("#" + divIdSet[4])
      .append("text")
      .data(data)
      .text(function(d) { return data[0][startIndex]["market_value"] + " Million €"; });

    /* Bar Chart */
    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([0, 130])
      .range([widthTeamBar, 0]);
    window["teamBarChartCanvas" + direction]
      .append("g")
      .attr("transform", "translate(0," + heightTeamBar + ")")
      .call(d3.axisBottom(x))
      .style("opacity", 0);

    var teamCategories = [
      "matches_played",
      "goals_scored",
      "goals_against",
      "shots",
      "shots_on_target",
      "penalties",
      "offsides",
      "corners",
      "fouls_committed",
      "fouls_suffered",
      "yellow_cards",
      "red_cards"
    ];

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, heightTeamBar])
      .domain(teamCategories)
      .padding(0.4);

    //Set Axis Origin to Right side when Chart should head to left and vice versa
    window["teamBarChartCanvas" + direction]
        .append("g")
        .call(d3.axisLeft(y))
        .style("opacity", 0);

    //Bars
    window["teamBarChartCanvas" + direction]
      .selectAll("bar")
      .data(data[1].filter(function(d) { return d.country == allteams[startIndex]; }))
      .enter()
      .append("line")
      .attr("class", "line")
      .attr("x1", function(d){
          if(direction == "left"){ return x(d.value); 
        } else{ return  x(widthTeamBar)}
      })
      .attr("x2", function(d){
          if(direction == "left"){ return x(0); 
        } else{ return widthTeamBar - x(d.value);}
      })
      .attr("y1", function(d) { return y(d.category) + 11.5; })
      .attr("y2", function(d) { return y(d.category) + 11.5; })
      .attr("stroke-linecap", "round")
      .attr("stroke-width", y.bandwidth())
      .attr("stroke", data[0][startIndex]["color"]);

  
    // Sets direction for Label for bar left/right
    function setBarLabeldirection(labelDirection) {
      if (labelDirection == "left") {
        return -35;
      } else {
        return 20;
      }
    }

    //Bar Label
    window["teamBarChartCanvas" + direction]
      .selectAll(".text")
      .data( data[1].filter(function(d) { return d.country == allteams[startIndex]; }))
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", function(d){
        if(direction == "left"){ return x(d.value) + setBarLabeldirection(direction); 
      } else{ return widthTeamBar - x(d.value) + setBarLabeldirection(direction)}
      })
      .attr("y", function(d) { return y(d.category) + 5 ; })
      .attr("font-family", "dusha")
      .style("font-weight", "bold")
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });

    //Progress Pie Chart
    var arc = d3
      .arc()
      .startAngle(0)
      .innerRadius(70)
      .outerRadius(radius);

    //Neutral background color to close the circle
    window["possessionPieCanvas" + direction]
      .append("path")
      .datum({ endAngle: tau })
      .style("fill", "#F4F4F4")
      .attr("d", arc);

    // Add the arc
    window["progressPie" + direction] =  window["possessionPieCanvas" + direction]
      .append("path")
      .datum({ endAngle: (data[0][startIndex]["possession"] / 100) * tau })
      .style("fill", data[0][startIndex]["color"])
      .attr("d", arc);

    window["progressText" + direction] =  window["possessionPieCanvas" + direction]
      .append("text")
      .attr("class", "percentage")
      .attr("text-anchor", "middle")
      .attr("font-family", "dusha")
      .attr("font-size", "1.8em")
      .attr("x", 8)
      .attr("y", 10)
      .text(data[0][startIndex]["possession"] + "%");

    function arcTween(newAngle, newText, direction) {
      return function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          window["progressText" + direction].text(newText)
          return arc(d);
        };
      };
    }

    //Initialise Dropdown-player
    var initialTeamPlayers = data[2].filter(function(d) {
      return d.Team == data[0][startIndex]["country"];
    });

    var maxRating = d3.max(initialTeamPlayers, function(d) { return + d.Rating;} );
    var initialSelectionPlayer = initialTeamPlayers.filter(function (d) { return d.Rating == maxRating })

    // Dropdown-player
    d3.select("#" + divIdSet[5])
      .selectAll("myOptions")
      .data(initialTeamPlayers)
      .enter()
      .append("option")
      .text(function(d) { return d.FullName; }) // text showed in the menu
      .attr("value", function(d) { return d.FullName; })
      .attr("data-icon", function(d) { return d.Photo});

    d3.select("#" + divIdSet[5])
      .property("selectedIndex", findIndex(initialTeamPlayers, initialSelectionPlayer[0].Player));


    // Updates all values
    function updateAll(selectedTeam, direction) {

        generateDivIds(direction);
      
        // Create new generalInfo data with selection
      var generalInfoDataFilter = data[0].filter(function(d) {
        return d.country == selectedTeam;
      });

      //Flag
      d3.selectAll("#" + divIdSet[1])
        .data(generalInfoDataFilter)
        .attr("id", divIdSet[1])
        .attr("xlink:href", function(d) { return generalInfoDataFilter[0]["flag"]; })
        .attr("width", 100)
        .attr("height", 50);

      //Logo
      d3.selectAll("#" + divIdSet[2])
        .data(generalInfoDataFilter)
        .attr("id", divIdSet[2])
        .attr("xlink:href", function(d) { return generalInfoDataFilter[0]["team-logo"]; })
        .attr("height", 80)
        .attr("width", 80);

      d3.select("#" + divIdSet[3])
        .data(data)
        .attr("y", 200)
        .attr("x", 0)
        .text(function(d) { return generalInfoDataFilter[0]["final_placement"]; });

      d3.select("#" + divIdSet[4])
        .data(data)
        .text(function(d) { return generalInfoDataFilter[0]["market_value"] + " Million €"; });

      
      // Create new barChart data with selection
      var barChartDataFilter = data[1].filter(function(d) {
        return d.country == selectedTeam;
      });

      // variable to map data to existing bars
      var updateBars = window["teamBarChartCanvas" + direction]
        .selectAll(".line")
        .data(barChartDataFilter);

        updateBars.exit().remove();

      // Pass data to update bar
      updateBars
        .enter()
        .append("line")
        .attr("class", "line")
        .merge(updateBars)
        .transition()
        .duration(1000)
        .attr("x1", function(d){
            if(direction == "left"){ return x(d.value); 
          } else{ return  x(widthTeamBar)}
        })
        .attr("x2", function(d){
            if(direction == "left"){ return x(0); 
          } else{ return widthTeamBar - x(d.value);}
        })
        .attr("y1", function(d) { return y(d.category) + 11.5; })
        .attr("y2", function(d) { return y(d.category) + 11.5; })
        .attr("stroke-linecap", "round")
        .attr("stroke-width", y.bandwidth())
        .attr("stroke", generalInfoDataFilter[0]["color"]);

      // variable to map data to existing barText
      var updateBartext = window["teamBarChartCanvas" + direction]
        .selectAll(".label")
        .data(barChartDataFilter);

      updateBartext.exit().remove();

      updateBartext
        .enter()
        .append("text")
        .merge(updateBartext)
        .transition()
        .duration(1000)
        .attr("class", "label")
        .attr("x", function(d){
            if(direction == "left"){ return x(d.value) + setBarLabeldirection(direction); 
          } else{ return widthTeamBar - x(d.value) + setBarLabeldirection(direction)}
        })
        .attr("y", function(d) { return y(d.category) + 5; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });

      //update Progress Pie Chart
      window["progressPie" + direction]
        .transition()
        .duration(1000)
        .style("fill", generalInfoDataFilter[0]["color"] )
        .attrTween("d", arcTween((generalInfoDataFilter[0]["possession"]/100) * tau,
           generalInfoDataFilter[0]["possession"]+"%",
           direction)
        );

      // update Dropdown list for players of selected team
      var selectedTeamPlayers = data[2].filter(function(d) {
        return d.Team == selectedTeam;
      });

      var updatedMaxRating = d3.max(selectedTeamPlayers, function(d) { return + d.Rating;} );
      var updatedInitialSelectionPlayer = selectedTeamPlayers.filter(function (d) { return d.Rating == updatedMaxRating })


      var updatePlayerSelect = d3
        .select("#" + divIdSet[5])
        .selectAll("option")
        .data(selectedTeamPlayers);

      updatePlayerSelect.exit().remove();

      updatePlayerSelect
        .enter()
        .append("option")
        .merge(updatePlayerSelect)
        .text(function(d) { return d.FullName; }) // text showed in the menu
        .attr("value", function(d) { return d.FullName; })
        .attr("data-icon", function(d) { return d.Photo});
      
        d3.select("#" + divIdSet[5])
          .property("selectedIndex", findIndex(selectedTeamPlayers, updatedInitialSelectionPlayer[0].Player));


      //initialize Materialize Dropdown
        $(document).ready(function(){
        $('select').formSelect();
      });
  
      //Update Player statistics on dropdown select
      window.initialiseFirstPlayerOnTeamChange();

    }

    // When a new Team is selected, run the update function
    d3.select("#select-team-button-left").on("change", function(d) {
      var selectedOptionLeft = d3.select(this).property("value");
      updateAll(selectedOptionLeft, "left");
    });

    d3.select("#select-team-button-right").on("change", function(d) {
        var selectedOptionRight = d3.select(this).property("value");
        updateAll(selectedOptionRight, "right");
      });
  }

  //initialize Materialize Dropdown
  $(document).ready(function(){
    $('select').formSelect();
  });
});

