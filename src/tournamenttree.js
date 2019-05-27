
// set the dimensions and margins of the diagram
var margin = { top: 40, right: 50, bottom: 50, left: 100 },
  width = 700 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom,
  separationConstant = 1;

var treeData = {
  a: "FRA",
  flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/fra",
  b: "CRO",
  flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/cro",
  ascore: 4,
  bscore: 2,
  win: true,
  children: [
    {
      a: "FRA",
      flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/fra",
      b: "BEL",
      flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bel",
      ascore: 1,
      bscore: 0,
      win: true,
      children: [
        {
          a: "URU",
          flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/uru",
          b: "FRA",
          flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/fra",
          ascore: 0,
          bscore: 2,
          win: true,
          children: [
            {
              a: "FRA",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/fra",
              b: "ARG",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/arg",
              ascore: 4,
              bscore: 2,
              win: true,
            },
            {
              a: "URU",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/uru",
              b: "POR",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/por",
              ascore: 2,
              bscore: 1,
              win: true
            }
          ]
        },
        {
          a: "BRA",
          flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bra",
          b: "BEL",
          flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bel",
          ascore: 1,
          bscore: 2,
          win: true,
          children: [
            {
              a: "BRA",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bra",
              b: "MEX",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/mex",
              ascore: 2,
              bscore: 0,
              win: true
            },
            {
              a: "BEL",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bel",
              b: "JPN",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/jpn",
              ascore: 3,
              bscore: 2,
              win: true
            }
          ]
        }
      ]
    },
    {
      a: "CRO",
      flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/cro",
      b: "ENG",
      flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/eng",
      ascore: 2,
      bscore: 1,
      win: true,
      children: [
        {
          a: "RUS",
          flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/rus",
          b: "CRO",
          flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/cro",
          ascore: 2,
          bscore: 2,
          win: true,
          children: [
            {
              a: "ESP",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/esp",
              b: "RUS",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/rus",
              ascore: 1,
              bscore: 1,
              win: true
            },
            {
              a: "CRO",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/cro",
              b: "DEN",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/den",
              ascore: 1,
              bscore: 1,
              win: true
            }
          ]
        },
        {
          a: "SWE",
          flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/swe",
          b: "ENG",
          flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/eng",
          ascore: 0,
          bscore: 2,
          win: true,
          children: [
            {
              a: "SWE",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/swe",
              b: "SUI",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/sui",
              ascore: 1,
              bscore: 0,
              win: true
            },
            {
              a: "COL",
              flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/col",
              b: "ENG",
              flagb:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/eng",
              ascore: 1,
              bscore: 1,
              win: true
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

  .style("left", d => width - d.y + (margin.left*0.5) + "px")
  .style("top", d => d.x + (!d.data.b ? 12 : 0) + (!d.data.children ? -4 : 0) + 15 + "px")
  .html(d => gameTemplate(d));

// third place
var thrdData = {
  data: {
    a: "BEL",
    flaga:"https://api.fifa.com/api/v1/picture/flags-fwc2018-5/bel",
    b: "ENG",
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
  .style("left", width -130+ "px")
  .style("top", height / 2 + margin.top - 42 + "px");

thrd
  .append("div")
  .classed("title", true)
  .html("Third Place");

thrd
  .append("div")
  .classed("content", true)
  .html(d => gameTemplate(thrdData));

