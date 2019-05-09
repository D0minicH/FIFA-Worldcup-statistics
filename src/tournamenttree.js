
// set the dimensions and margins of the diagram
var margin = { top: 40, right: 0, bottom: 50, left: 240 },
  width = 1100 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom,
  separationConstant = 1;

var treeData = {
  a: "France",
  flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/fra",
  b: "Croatia",
  flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/cro",
  ascore: 4,
  bscore: 2,
  win: true,
  children: [
    {
      a: "France",
      flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/fra",
      b: "Belgium",
      flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bel",
      ascore: 1,
      bscore: 0,
      win: true,
      children: [
        {
          a: "Uruguay",
          flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/uru",
          b: "France",
          flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/fra",
          ascore: 0,
          bscore: 2,
          win: true,
          children: [
            {
              a: "France",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/fra",
              b: "Argentina",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/arg",
              ascore: 4,
              bscore: 2,
              win: true,
            },
            {
              a: "Uruguay",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/uru",
              b: "Portugal",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/por",
              ascore: 2,
              bscore: 1,
            }
          ]
        },
        {
          a: "Brasil",
          flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bra",
          b: "Belgium",
          flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bel",
          ascore: 1,
          bscore: 2,
          win: false,
          children: [
            {
              a: "Brasil",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bra",
              b: "Mexico",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/mex",
              ascore: 2,
              bscore: 0,
              win: false
            },
            {
              a: "Belgium",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bel",
              b: "Japan",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/jpn",
              ascore: 3,
              bscore: 2,
              win: false
            }
          ]
        }
      ]
    },
    {
      a: "Croatia",
      flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/cro",
      b: "England",
      flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/eng",
      ascore: 2,
      bscore: 1,
      win: true,
      children: [
        {
          a: "Russia",
          flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/rus",
          b: "Croatia",
          flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/cro",
          ascore: 2,
          bscore: 2,
          win: true,
          children: [
            {
              a: "Spain",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/esp",
              b: "Russia",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/rus",
              ascore: 1,
              bscore: 1,
              win: false
            },
            {
              a: "Croatia",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/cro",
              b: "Denmark",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/den",
              ascore: 1,
              bscore: 1,
              win: true
            }
          ]
        },
        {
          a: "Sweden",
          flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/swe",
          b: "England",
          flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/eng",
          ascore: 0,
          bscore: 2,
          win: false,
          children: [
            {
              a: "Sweden",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/swe",
              b: "Switzerland",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/sui",
              ascore: 1,
              bscore: 0,
              win: false
            },
            {
              a: "Columbia",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/col",
              b: "England",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/eng",
              ascore: 1,
              bscore: 1,
              win: false
            }
          ]
        }
      ]
    }
  ]
};

// line connector between nodes
var line = d3
  .line()
  .x(d => width - d.y)
  .y(d => d.x)
  .curve(d3.curveStep);

// declares a tree layout and assigns the size
var treemap = d3
  .tree()
  .size([height, width])
  .separation((a, b) => (a.parent == b.parent ? 1 : separationConstant));

//  assigns the data to a hierarchy using parent-child relationships
var nodes = d3.hierarchy(treeData);

// maps the node data to the tree layout
nodes = treemap(nodes);

var tournamentCanvas = d3
  .select("#tournament-tree")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var g = tournamentCanvas
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// adds the links between the nodes
var link = g
  .selectAll(".link")
  .data(nodes.descendants().slice(1))
  .enter()
  .append("path")
  .attr("class", "link")
  .attr("d", d => line([d, d.parent]))
  .classed("win", d => d.data.win);

// adds labels to the nodes
function gameTemplate(d) {
  return (
    "" + "<div class='row" + (d.data.ascore > d.data.bscore ? ' winner' : '') + "'>" +
    "<img class='cell flag'src=" + (d.data.flaga) +">" +
    "<span class='cell name'>" + d.data.a + "</span>" + 
    "<span class='cell score'>" + (d.data.ascore >= 0 ? d.data.ascore : '') + "</span>" +  
  "</div>" + 
  
  "<div class='row" + (d.data.bscore > d.data.ascore ? ' winner' : '') + "'>" +
    "<img class='cell flag' src=" + (d.data.flagb) + ">" +  
    "<span class='cell name'>" + (d.data.b || '') + "</span>" + 
    "<span class='cell score'>" + (d.data.bscore >= 0 ? d.data.bscore : '') + "</span>" +  
  "</div>"
  );
}

var labels = d3
  .select("#labels")
  .selectAll("div")
  .data(nodes.descendants())
  .enter()
  .append("div")
  .classed("table", true)
  .classed("played", d => d.data.ascore || d.data.bscore)

  .style("left", d => width - d.y + margin.left - 100 + "px")
  .style(
    "top",
    d => d.x + (!d.data.b ? 12 : 0) + (!d.data.children ? -4 : 0) + 10 + "px"
  )
  .html(d => gameTemplate(d));

// third place
var thrdData = {
  data: {
    a: "Belgium",
    flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bel",
    b: "England",
    flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/eng",
    ascore: 2,
    bscore: 0
  }
};

var thrd = d3
  .select("#labels")
  .append("div")
  .classed("thirdplace", true)
  .style("position", "absolute")
  .style("left", width -145+ "px")
  .style("top", height / 2 + margin.top - 48 + "px");

thrd
  .append("div")
  .classed("title", true)
  .html("Third Place");

thrd
  .append("div")
  .classed("content", true)
  .html(d => gameTemplate(thrdData));

