
var marginInfosRight = { top: 10, right: 100, bottom: 30, left: 30 },
    widthInfosRight = 400 - marginInfosRight.left - marginInfosRight.right,
    heightInfosRight = 200 - marginInfosRight.top - marginInfosRight.bottom;

// set the dimensions and margins of the graph
var marginTeamBarRight = { top: 10, right: 30, bottom: 30, left: 0 },
    widthTeamBarRight = 450 - marginTeamBarRight.left - marginTeamBarRight.right,
    heightTeamBarRight = 600 - marginTeamBarRight.top - marginTeamBarRight.bottom;

// append the svg object to the body of the page
var genralInfoCanvasRight = d3
  .select("#team-statistics-right")
  .append("svg")
  .attr("width", widthInfosRight + marginInfosRight.left + marginInfosRight.right)
  .attr("height", heightInfosRight + marginInfosRight.top + marginInfosRight.bottom)
  .append("g")
  .attr("transform", "translate(" + marginTeamBarRight.left + "," + marginTeamBarRight.top + ")");

var teamBarChartCanvasRight = d3
  .select("#team-barchart-right")
  .append("svg")
  .attr("width", widthTeamBarRight + marginTeamBarRight.left + marginTeamBarRight.right)
  .attr("height", heightTeamBarRight + marginTeamBarRight.top + marginTeamBarRight.bottom)
  .append("g")
  .attr("transform", "translate(" + marginTeamBarRight.left + "," + marginTeamBarRight.top + ")");

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

//Read the data
Promise.all([
  d3.csv("/data/wc_teams_infos.csv"),
  d3.csv("/data/wc_team_stats.csv")
]).then(function(data) {
  console.log(data[0][0])
  console.log(data[1][0])

  // //map with all team names
  var allteamsRight = d3.map(data[1], function(d){return(d.country)}).keys()

  // Dropdown-Button right
  d3.select("#select-team-button-right")
    .selectAll("myOptions")
    .data(allteamsRight)
    .enter()
    .append("option")
    .text(function(d) {return d;}) // text showed in the menu
    .attr("value", function(d) {return d;});

    // .text(function(d) {return d.country;}) // text showed in the menu
    // .attr("value", function(d, i) {return i;});

  // generate a random index value and set the selector to the team
  // at that index value in the data array
  var indexRight = 15;
  d3.select("#select-team-button-right").property("selectedIndex", indexRight);
  // console.log(index);

  //Flag
  genralInfoCanvasRight
    .append("image")
    .data(data)
    .attr("id", "flag-right")
    .attr("y", 40)
    .attr("x", 0)
    .attr("xlink:href", function(d) {
      return data[0][indexRight]["flag"];
    })
    .attr("height", 110);
  d3.select("#flag-right").style('transform', 'translate(22%, 0)')

d3.select("#final-placement-right")
  .append("text")
  .data(data)
  .text(function(d) {
    return data[0][indexRight]["final_placement"];
  });

d3.select("#market-value-right")
  .append("text")
  .data(data)
  .text(function(d) {
    return "Market value: " + (data[0][indexRight]["market_value"] + " Million €");
  });

  /* Bar Chart */
  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([0, 120])
    .range([0,widthTeamBarRight]);
  teamBarChartCanvasRight
    .append("g")
    .attr("transform", "translate(0," + heightTeamBarRight + ")")
    .call(d3.axisBottom(x))
    .style("opacity", 0)    

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, heightTeamBarRight])
    .domain(teamCategories)
    .padding(0.1);
  teamBarChartCanvasRight
    .append("g")
    .call(d3.axisLeft(y))
    .style("opacity", 0)   

  //Bars
  teamBarChartCanvasRight.selectAll("bar")
    .data(data[1].filter(function(d){return d.country==allteamsRight[15]}))
    .enter()
    .append("rect")
    .attr("x",0)
    .attr("y", function(d) {return y(d.category);})
    .attr("width", function(d) {return x(d.value);})
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2");

  //Bar Label
  teamBarChartCanvasRight.selectAll(".text")  		
    .data(data[1].filter(function(d){return d.country==allteamsRight[15]}))
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", (function(d) { return x(d.value) + 10;}))
    .attr("y", function(d) { return y(d.category) + 14; })
    .style("font-weight", "bold")
    .attr("dy", ".75em")
    .text(function(d) { return d.value; });   	

  // Updates the chart
  function updateRightTeam(selectedGroupRight) {

    // Create new generalInfo data with selection
    var generalInfoDataFilterRight = data[0].filter(function(d){return d.country==selectedGroupRight})

    //Flag
    d3.selectAll("#flag-right")
      .data(generalInfoDataFilterRight)
      .attr("id", "flag-right")
      .attr("xlink:href", function(d) {
        return generalInfoDataFilterRight[0]["flag"];
      })
      .attr("height", 110);

    d3.select("#final-placement-right")
      .data(data)
      .attr("y", 200)
      .attr("x", 0)
      .text(function(d) {
        return generalInfoDataFilterRight[0]["final_placement"];
      });

    d3.select("#market-value-right")
      .data(data)
      .text(function(d) {
        return "Market value: " + (generalInfoDataFilterRight[0]["market_value"] + " Million €");
      });

    // Create new barChart data with selection
    var barChartDataFilterRight = data[1].filter(function(d){return d.country==selectedGroupRight})

    // variable to map data to existing bars
    var updateBarsRight = teamBarChartCanvasRight.selectAll("rect")
      .data(barChartDataFilterRight)
    
    // Pass data to update bar
    updateBarsRight.enter()
    .append("rect")
    .merge(updateBarsRight)
      .transition()
      .duration(1000)
        .attr("x",0)
        .attr("y", function(d) {return y(d.category);})
        .attr("width", function(d) {return x(d.value);})
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2");

    // variable to map data to existing barText
    var updatetextRight = teamBarChartCanvasRight.selectAll(".label")
      .data(barChartDataFilterRight)
    
    updatetextRight.exit().remove();
    
    updatetextRight.enter()
    .append("text")
    .merge(updatetextRight)
    .transition()
      .duration(1000)
        .attr("class","label")
        .attr("x", (function(d) { return x(d.value) + 10;  }  ))
        .attr("y", function(d) { return y(d.category) + 14; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });   

    
  }

  // When the button is changed, run the updateChart function
  d3.select("#select-team-button-right").on("change", function(d) {
      var selectedOptionRight = d3.select(this).property("value")
      console.log("Option:"+selectedOptionRight)
      updateRightTeam(selectedOptionRight)
  })
});
