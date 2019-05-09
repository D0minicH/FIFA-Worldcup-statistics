
var marginGeneralInfos = { top: 10, right: 100, bottom: 30, left: 30 },
    widthGeneralInfos = 400 - marginGeneralInfos.left - marginGeneralInfos.right,
    heightGeneralInfos = 200 - marginGeneralInfos.top - marginGeneralInfos.bottom;

// set the dimensions and margins of the graph
var marginTeamBarChart = { top: 10, right: 300, bottom: 30, left: 30 },
    widthTeamBarChart = 1000 - marginTeamBarChart.left - marginTeamBarChart.right,
    heightTeamBarChart = 600 - marginTeamBarChart.top - marginTeamBarChart.bottom;

// append the svg object to the body of the page
var genralInfoCanvas = d3
  .select("#team-statistics")
  .append("svg")
  .attr("width", widthGeneralInfos + marginGeneralInfos.left + marginGeneralInfos.right)
  .attr("height", heightGeneralInfos + marginGeneralInfos.top + marginGeneralInfos.bottom)
  .append("g")
  .attr("transform", "translate(" + marginTeamBarChart.left + "," + marginTeamBarChart.top + ")");

var teamBarChartCanvas = d3
  .select("#team-barchart")
  .append("svg")
  .attr("width", widthTeamBarChart + marginTeamBarChart.left + marginTeamBarChart.right)
  .attr("height", heightTeamBarChart + marginTeamBarChart.top + marginTeamBarChart.bottom)
  .append("g")
  .attr("transform", "translate(" + marginTeamBarChart.left + "," + marginTeamBarChart.top + ")");

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

  //map with all team names
  var allteams = d3.map(data[1], function(d){return(d.country)}).keys()

  // Dropdown-Button
  d3.select("#select-team-button-left")
    .selectAll("myOptions")
    .data(allteams)
    .enter()
    .append("option")
    .text(function(d) {return d;}) // text showed in the menu
    .attr("value", function(d) {return d;});

    // .text(function(d) {return d.country;}) // text showed in the menu
    // .attr("value", function(d, i) {return i;});

  // generate a random index value and set the selector to the team
  // at that index value in the data array
  var index = 0;
  //d3.select("#select-team-button-left").property("selectedIndex", index);
  // console.log(index);

  //Flag
  d3.select("svg")
    .append("image")
    .data(data)
    .attr("id", "flag")
    .attr("y", 40)
    .attr("x", 0)
    .attr("xlink:href", function(d) {
      return data[0][index]["flag"];
    })
    .attr("height", 110);

  d3.select("#final-placement")
    .append("text")
    .data(data)
    // .attr("y", 200)
    // .attr("x", 0)
    .text(function(d) {
      return data[0][index]["final_placement"];
    });

  d3.select("#market-value")
    .append("text")
    .data(data)
    // .attr("y", 200)
    // .attr("x", 0)
    .text(function(d) {
      return "Market value: " + (data[0][index]["market_value"] + " Million €");
    });

  /* Bar Chart */
  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([0, 120])
    .range([widthTeamBarChart,0]);
  teamBarChartCanvas
    .append("g")
    .attr("transform", "translate(0," + heightTeamBarChart + ")")
    .call(d3.axisBottom(x))
    .style("opacity", 0)    

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, heightTeamBarChart])
    .domain(teamCategories)
    .padding(0.1);
  teamBarChartCanvas
    .append("g")
    .attr("transform", "translate( " + widthTeamBarChart + ", 0 )")
    .attr("dx", ".75em")
    .call(d3.axisRight(y).tickSize([0]))
    .selectAll("text")
    .attr("transform", "translate(30,0)")
    .style("font-size", 20)
    .style("font-weight", "bold");

  //Bars
  teamBarChartCanvas.selectAll("bar")
    .data(data[1].filter(function(d){return d.country==allteams[0]}))
    .enter()
    .append("rect")
    .attr("x", function(d) {return x(d.value);})
    .attr("y", function(d) {return y(d.category);})
    .attr("width", function(d) {return widthTeamBarChart - x(d.value);})
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2");

  //Bar Label
  teamBarChartCanvas.selectAll(".text")  		
    .data(data[1].filter(function(d){return d.country==allteams[0]}))
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", (function(d) { return x(d.value) - 25;  }  ))
    .attr("y", function(d) { return y(d.category) + 14; })
    .style("font-weight", "bold")
    .attr("dy", ".75em")
    .text(function(d) { return d.value; });   	

  // Updates the chart
  function updateBarChart(selectedGroup) {

    // Create new generalInfo data with selection
    var generalInfoDataFilter = data[0].filter(function(d){return d.country==selectedGroup})

    //Flag
    d3.selectAll("image")
      .data(generalInfoDataFilter)
      .attr("id", "flag")
      .attr("xlink:href", function(d) {
        return generalInfoDataFilter[0]["flag"];
      })
      .attr("height", 110);

    d3.select("#final-placement")
      .data(data)
      .attr("y", 200)
      .attr("x", 0)
      .text(function(d) {
        return generalInfoDataFilter[0]["final_placement"];
      });

    d3.select("#market-value")
      .data(data)
      .text(function(d) {
        return "Market value: " + (generalInfoDataFilter[0]["market_value"] + " Million €");
      });

    // Create new barChart data with selection
    var barChartDataFilter = data[1].filter(function(d){return d.country==selectedGroup})

    // variable to map data to existing bars
    var updateBars = teamBarChartCanvas.selectAll("rect")
      .data(barChartDataFilter)
    
    // Pass data to update bar
    updateBars.enter()
    .append("rect")
    .merge(updateBars)
      .transition()
      .duration(1000)
        .attr("x", function(d) {return x(d.value);})
        .attr("y", function(d) {return y(d.category);})
        .attr("width", function(d) {return widthTeamBarChart - x(d.value);})
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2");

    // variable to map data to existing barText
    var updatetext = teamBarChartCanvas.selectAll(".label")
      .data(barChartDataFilter)
    
    updatetext.exit().remove();
    
    updatetext.enter()
    .append("text")
    .merge(updatetext)
    .transition()
      .duration(1000)
        .attr("class","label")
        .attr("x", (function(d) { return x(d.value) - 25;  }  ))
        .attr("y", function(d) { return y(d.category) + 14; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });   

    
  }

  // When the button is changed, run the updateChart function
  d3.select("#select-team-button-left").on("change", function(d) {
      var selectedOption = d3.select(this).property("value")
      console.log("Option:"+selectedOption)
      updateBarChart(selectedOption)
  })
});
