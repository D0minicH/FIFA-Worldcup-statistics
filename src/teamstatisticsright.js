
var marginFlagRight = { top: 0, right: 0, bottom: 0, left: 0 },
    widthFlagRight = 100 - marginFlagRight.left - marginFlagRight.right,
    heightFlagRight = 50 - marginFlagRight.top - marginFlagRight.bottom;

var marginLogoRight = { top: 0, right: 0, bottom: 0, left: 0 },
    widthLogoRight = 80 - marginLogoRight.left - marginLogoRight.right,
    heightLogoRight = 50 - marginLogoRight.top - marginLogoRight.bottom;

// set the dimensions and margins of the graph
var marginTeamBarRight = { top: 10, right: 30, bottom: 30, left: 0 },
    widthTeamBarRight = 400 - marginTeamBarRight.left - marginTeamBarRight.right,
    heightTeamBarRight = 600 - marginTeamBarRight.top - marginTeamBarRight.bottom;

var flagCanvasRight = d3
  .select("#team-flag-right")
  .append("svg")
  .attr("width", widthFlagRight + marginFlagRight.left + marginFlagRight.right)
  .attr("height", heightFlagRight + marginFlagRight.top + marginFlagRight.bottom)
  .append("g")
  .attr("transform", "translate(" + marginFlagRight.left + "," + marginFlagRight.top + ")");

var logoCanvasRight = d3
  .select("#team-logo-right")
  .append("svg")
  .attr("width", widthLogoRight + marginLogoRight.left + marginLogoRight.right)
  .attr("height", widthLogoRight + marginLogoRight.top + marginLogoRight.bottom)
  .append("g")
  .attr("transform", "translate(" + marginLogoRight.left + "," + marginLogoRight.top + ")");

var teamBarChartCanvasRight = d3
  .select("#team-barchart-right")
  .append("svg")
  .attr("width", widthTeamBarRight + marginTeamBarRight.left + marginTeamBarRight.right)
  .attr("height", heightTeamBarRight + marginTeamBarRight.top + marginTeamBarRight.bottom)
  .append("g")
  .attr("transform", "translate(" + marginTeamBarRight.left + "," + marginTeamBarRight.top + ")");

var possessionPieCanvasRight = d3.select("#possession-pie-right")
  .append("svg")
    .attr("width", widthPie)
    .attr("height", heightPie)
  .append("g")
    .attr("transform", "translate(" + widthPie / 2 + "," + heightPie / 2 + ")");

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
  d3.csv("./data/wc_teams_infos.csv"),
  d3.csv("./data/wc_team_stats.csv")
]).then(function(data) {

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
  flagCanvasRight
    .append("image")
    .data(data)
    .attr("id", "flag-right")
    .attr("xlink:href", function(d) {
      return data[0][indexRight]["flag"];
    })
    .attr("width", 100)
    .attr("height", 50);

  //Logo
  logoCanvasRight
    .append("image")
    .data(data)
    .attr("id", "logo-right")
    .attr("xlink:href", function(d) {
      return data[0][indexRight]["team-logo"];
    })
    .attr("height", 80)
    .attr("width", 80);
        
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
    return (data[0][indexRight]["market_value"] + " Million €");
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
    .attr("fill", data[0][indexRight]["color"]);

  //Bar Label
  teamBarChartCanvasRight.selectAll(".text")  		
    .data(data[1].filter(function(d){return d.country==allteamsRight[15]}))
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", (function(d) { return x(d.value) + 10;}))
    .attr("y", function(d) { return y(d.category) + 14; })
    .attr("font-family","dusha")
    .style("font-weight", "bold")
    .attr("dy", ".75em")
    .text(function(d) { return d.value; });   
    
//Progress Pie Chart
  var arc = d3.arc()
    .startAngle(0)
    .innerRadius(110)
    .outerRadius(radius)

// Add the arc
var backgroundRightPie = possessionPieCanvasRight.append("path")
    .datum({endAngle: tau})
    .style("fill", "#F4F4F4")
    .attr("d", arc);

var progressPieRight = possessionPieCanvasRight.append("path")
.datum({endAngle: (data[0][indexRight]["possession"]/100) * tau})
.style("fill", data[0][indexRight]["color"])
.attr("d", arc);

var progressTexRight = possessionPieCanvasRight.append("text")
    .attr("class","percentage")
    .attr("text-anchor", "middle")
    .attr("font-family","dusha")
    .attr('font-size', '2.5em')
    .attr('x',10)
		.attr('y', 20)
    .text(data[0][indexRight]["possession"]+"%");

function arcTweenRight(newAngle, newText, newColor) {
  return function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      progressPieRight.style("fill", newColor)
      d.endAngle = interpolate(t);
      progressTexRight.text(newText)
      return arc(d);
    };
  };
};

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
      .attr("width", 100)
      .attr("height", 50);

    //Logo
    d3.selectAll("#logo-right")
      .data(generalInfoDataFilterRight)
      .attr("id", "logo-right")
      .attr("xlink:href", function(d) {
        return generalInfoDataFilterRight[0]["team-logo"];
      })
      .attr("height", 80);

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
        return (generalInfoDataFilterRight[0]["market_value"] + " Million €");
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
        .attr("fill", generalInfoDataFilterRight[0]["color"]);

    // variable to map data to existing barText
    var updateBarTextRight = teamBarChartCanvasRight.selectAll(".label")
      .data(barChartDataFilterRight)
    
    updateBarTextRight.exit().remove();
    
    updateBarTextRight.enter()
    .append("text")
    .merge(updateBarTextRight)
    .transition()
      .duration(1000)
        .attr("class","label")
        .attr("x", (function(d) { return x(d.value) + 10;  }  ))
        .attr("y", function(d) { return y(d.category) + 14; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });   
  
  //update Progress Pie Chart
  progressPieRight.transition()
      .attr("fill", generalInfoDataFilterRight[0]["color"])
      .duration(1000)
      .attrTween("d", arcTweenRight((generalInfoDataFilterRight[0]["possession"]/100) * tau,
          generalInfoDataFilterRight[0]["possession"]+"%"))

  }

  // When the button is changed, run the updateChart function
  d3.select("#select-team-button-right").on("change", function(d) {
      var selectedOptionRight = d3.select(this).property("value")
      console.log("Option:"+selectedOptionRight)
      updateRightTeam(selectedOptionRight)
  })
});
