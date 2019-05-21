
var marginInfosLeft = { top: 0, right: 0, bottom: 0, left: 0 },
    widthInfosLeft = 100 - marginInfosLeft.left - marginInfosLeft.right,
    heightInfosLeft = 50 - marginInfosLeft.top - marginInfosLeft.bottom;

//Dimensions and margins Bar Chart
var marginTeamBarLeft = { top: 10, right: 0, bottom: 30, left: 30 },
    widthTeamBarLeft = 450 - marginTeamBarLeft.left - marginTeamBarLeft.right,
    heightTeamBarLeft = 600 - marginTeamBarLeft.top - marginTeamBarLeft.bottom;
   
//Dimensions barAxis (Y)
var marginBarAxis = { top: 10, right: 50, bottom: 30, left: 50 },
    widthBarAxis = 200 - marginBarAxis.left - marginBarAxis.right,
    heightBarAxis = 600 - marginBarAxis.top - marginBarAxis.bottom;

//Dimensions for the Piechart    
var widthPie = 250
    heightPie = 250
    marginPie = 40
    radius = Math.min(widthPie, heightPie) / 2 - marginPie
    tau= 2 * Math.PI,
    progress = 0,
    total = 100,
    formatPercent = d3.format(".0%");

// append the svg object to the body of the page
var genralInfoCanvasLeft = d3
  .select("#team-flag-left")
  .append("svg")
  .attr("width", widthInfosLeft + marginInfosLeft.left + marginInfosLeft.right)
  .attr("height", heightInfosLeft + marginInfosLeft.top + marginInfosLeft.bottom)
  .append("g")
  .attr("transform", "translate(" + marginInfosLeft.left + "," + marginInfosLeft.top + ")");

var teamBarChartCanvasLeft = d3
  .select("#team-barchart-left")
  .append("svg")
  .attr("width", widthTeamBarLeft + marginTeamBarLeft.left + marginTeamBarLeft.right)
  .attr("height", heightTeamBarLeft + marginTeamBarLeft.top + marginTeamBarLeft.bottom)
  .append("g")
  .attr("transform", "translate(" + marginTeamBarLeft.left + "," + marginTeamBarLeft.top + ")");

var teamBarChartAxis = d3
  .select("#team-barchart-axis")
  .append("svg")
  .attr("width", widthBarAxis + marginBarAxis.left + marginBarAxis.right)
  .attr("height", heightBarAxis + marginBarAxis.top + marginBarAxis.bottom)
  .append("g")
  .attr("transform", "translate(" + marginBarAxis.left + "," + marginBarAxis.top + ")");

  var possessionPieCanvasLeft = d3.select("#possession-pie-left")
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
  d3.csv("/data/wc_teams_infos.csv"),
  d3.csv("/data/wc_team_stats.csv")
]).then(function(data) {
  console.log(data[0][0])
  console.log(data[1][0])

  //map with all team names
  var allteamsLeft = d3.map(data[1], function(d){return(d.country)}).keys()

  // Dropdown-Button left
  d3.select("#select-team-button-left")
    .selectAll("myOptions")
    .data(allteamsLeft)
    .enter()
    .append("option")
    .text(function(d) {return d;}) // text showed in the menu
    .attr("value", function(d) {return d;});

    // .text(function(d) {return d.country;}) // text showed in the menu
    // .attr("value", function(d, i) {return i;});

  // generate a random index value and set the selector to the team
  // at that index value in the data array
  var indexLeft = 0;
  //d3.select("#select-team-button-left").property("selectedIndex", index);
  // console.log(index);

  //Flag
  genralInfoCanvasLeft
    .append("image")
    .data(data)
    .attr("id", "flag-left")
    .attr("xlink:href", function(d) {
      return data[0][indexLeft]["flag"];
    })
    .attr("width", 100);


  d3.select("#final-placement-left")
    .append("text")
    .data(data)
    // .attr("y", 200)
    // .attr("x", 0)
    .text(function(d) {
      return data[0][indexLeft]["final_placement"];
    });

  d3.select("#market-value-left")
    .append("text")
    .data(data)
    // .attr("y", 200)
    // .attr("x", 0)
    .text(function(d) {
      return (data[0][indexLeft]["market_value"] + " Million €");
    });

  /* Bar Chart */
  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([0, 120])
    .range([widthTeamBarLeft,0]);
  teamBarChartCanvasLeft
    .append("g")
    .attr("transform", "translate(0," + heightTeamBarLeft + ")")
    .call(d3.axisBottom(x))
    .style("opacity", 0)    

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, heightTeamBarLeft])
    .domain(teamCategories)
    .padding(0.1);
  teamBarChartCanvasLeft
    .append("g")
    .attr("transform", "translate( " + widthTeamBarLeft + ", 0 )")
    .attr("dx", ".75em")
    .call(d3.axisRight(y).tickSize([0]))
    

  //Bars
  teamBarChartCanvasLeft.selectAll("bar")
    .data(data[1].filter(function(d){return d.country==allteamsLeft[0]}))
    .enter()
    .append("rect")
    .attr("x", function(d) {return x(d.value);})
    .attr("y", function(d) {return y(d.category);})
    .attr("width", function(d) {return widthTeamBarLeft - x(d.value);})
    .attr("height", y.bandwidth())
    .attr("fill", data[0][indexLeft]["color"]);

  //Bar Axis
  teamBarChartAxis.selectAll("axislabels")
    .data([ "Matches played",
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
            "Red cards"])
    .enter()
    .append("text")
    .attr("x", 48)
    .attr("y", function(d,i){ return 27 + i*46.25})
    .text(function(d){ return d})
    .attr("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    .style("font-size", 20)
    .style("font-weight", "bold");

  //Bar Label
  teamBarChartCanvasLeft.selectAll(".text")  		
    .data(data[1].filter(function(d){return d.country==allteamsLeft[0]}))
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", (function(d) { return x(d.value) - 25;  }  ))
    .attr("y", function(d) { return y(d.category) + 14; })
    .style("font-weight", "bold")
    .attr("dy", ".75em")
    .text(function(d) { return d.value; });   	

//Progress Pie Chart
  var arc = d3.arc()
    .startAngle(0)
    .innerRadius(110)
    .outerRadius(radius)

// Add the arc
var backgroundleftPie = possessionPieCanvasLeft.append("path")
    .datum({endAngle: tau})
    .style("fill", "#F4F4F4")
    .attr("d", arc);

var progressPieLeft = possessionPieCanvasLeft.append("path")
    .datum({endAngle: (data[0][indexLeft]["possession"]/100) * tau})
    .style("fill", data[0][indexLeft]["color"])
    .attr("d", arc);

var progressTextLeft = possessionPieCanvasLeft.append("text")
    .attr("class","percentage")
	  .attr("text-anchor", "middle")
    .attr('font-size', '2.5em')
    .attr('x',10)
		.attr('y', 20)
	  .text(data[0][indexLeft]["possession"]+"%");

function arcTweenLeft(newAngle, newText, newColor) {
  return function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      progressPieLeft.style("fill", newColor)
      d.endAngle = interpolate(t);
      progressTextLeft.text(newText)
      return arc(d);
    };
  };
};

  // Updates all values
  function updateLeftTeam(selectedGroupLeft) {

    // Create new generalInfo data with selection
    var generalInfoDataFilterLeft = data[0].filter(function(d){return d.country==selectedGroupLeft})

    //Flag
    d3.selectAll("#flag-left")
      .data(generalInfoDataFilterLeft)
      .attr("id", "flag-left")
      .attr("xlink:href", function(d) {
        return generalInfoDataFilterLeft[0]["flag"];
      })
      .attr("width", 100);

    d3.select("#final-placement-left")
      .data(data)
      .attr("y", 200)
      .attr("x", 0)
      .text(function(d) {
        return generalInfoDataFilterLeft[0]["final_placement"];
      });

    d3.select("#market-value-left")
      .data(data)
      .text(function(d) {
        return (generalInfoDataFilterLeft[0]["market_value"] + " Million €");
      });

    // Create new barChart data with selection
    var barChartDataFilterLeft = data[1].filter(function(d){return d.country==selectedGroupLeft})

    // variable to map data to existing bars
    var updateBarsLeft = teamBarChartCanvasLeft.selectAll("rect")
      .data(barChartDataFilterLeft)
    
    // Pass data to update bar
    updateBarsLeft.enter()
    .append("rect")
    .merge(updateBarsLeft)
      .transition()
      .duration(1000)
        .attr("x", function(d) {return x(d.value);})
        .attr("y", function(d) {return y(d.category);})
        .attr("width", function(d) {return widthTeamBarLeft - x(d.value);})
        .attr("height", y.bandwidth())
        .attr("fill", generalInfoDataFilterLeft[0]["color"]);

    // variable to map data to existing barText
    var updateBartextLeft = teamBarChartCanvasLeft.selectAll(".label")
      .data(barChartDataFilterLeft)
    
    updateBartextLeft.exit().remove();
    
    updateBartextLeft.enter()
    .append("text")
    .merge(updateBartextLeft)
    .transition()
      .duration(1000)
        .attr("class","label")
        .attr("x", (function(d) { return x(d.value) - 25;  }  ))
        .attr("y", function(d) { return y(d.category) + 14; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });   

//udate Progress Pie Chart
  progressPieLeft.transition()
      .attr("fill", generalInfoDataFilterLeft[0]["color"])
      .duration(1000)
      .attrTween("d", arcTweenLeft((generalInfoDataFilterLeft[0]["possession"]/100) * tau,
          generalInfoDataFilterLeft[0]["possession"]+"%"))
}

  // When the button is changed, run the updateChart function
  d3.select("#select-team-button-left").on("change", function(d) {
      var selectedOptionLeft = d3.select(this).property("value")
      console.log("Option Left:"+selectedOptionLeft)
      updateLeftTeam(selectedOptionLeft)
  })
});
