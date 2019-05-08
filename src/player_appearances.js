// create svg canvas
const canvPlayerHeight = 200, canvPlayerWidth = 800;
const svg1 = d3.select("#player-stats-appearances").append("svg")
    .attr("width", canvPlayerWidth)
    .attr("height", canvPlayerHeight);

// calc the width and height depending on margins.
const lineWidth = 325;

d3.csv("./data/World_cup_2018_players_complete.csv").then(function (data) {
    const widthDomainAppearances = d3.extent(data, d => Number(d.Appearances));
    console.log(widthDomainAppearances);

    // Background Color
    svg1.append("rect")
        .attr("width", canvPlayerWidth)
        .attr("height", canvPlayerHeight)
        .attr("fill", "#F5EED5");

    // Texts Title
    svg1.append("text")
        .attr("y", 55)
        .attr("x", 55)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "left")
        .attr("font-weight", "bold")
        .attr("fill", "#171714")
        .text("Appearances");

    svg1.append("text")
        .attr("y", 55)
        .attr("x", 190)
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .style("text-anchor", "start")
        .attr("fill", "grey")
        .text("How many times...")
        .on("mouseover", function (d, i) {
            d3.select(this).transition()
                .style("opacity", 0)
                .transition()
                .text("How many times a player has appeared in all of the games.")
                .duration("300")
                .style("opacity", 1)
                .transition()
                .duration("300")
        })
        .on("mouseout", function (d, i) {
            d3.select(this).transition()
                .style("opacity", 0)
                .transition()
                .text("How many times ...")
                .duration("300")
                .style("opacity", 1)
                .transition()
                .duration("300")
        });

    // Texts Numbers
    svg1.append("text")
        .attr("y", 115)
        .attr("x", 55)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "left")
        .text(data[1].Appearances);

    svg1.append("text")
        .attr("y", 115)
        .attr("x", 740)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "right")
        .text(data[15].Appearances);

    // Texts Player Labels
    svg1.append("text")
        .attr("y", 115)
        .attr("x", 389)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "end")
        .text(data[45].Player);

    svg1.append("text")
        .attr("y", 115)
        .attr("x", 409)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "start")
        .text(data[15].Player);

    // First Row Left
    svg1.append("line")
        .attr("x1", 60)
        .attr("y1", 150)
        .attr("x2", 385)
        .attr("y2", 150)
        .attr("stroke", "#E5C685")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 20);

    svg1.append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 385)
        .attr("y", 140)
        .attr("fill", "grey");

    svg1.append("line")
        .attr("x1", 385)
        .attr("y1", 150)
        .attr("x2", 385)
        .attr("y2", 150)
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("x1", 380)
                .transition()
                .duration(1000)
                .attr("x1", (385 - ((lineWidth / (widthDomainAppearances[1])) * (data[1].Appearances))))
        })
        .attr("stroke", "#D30208")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 20)
        .transition()
        .duration(500)
        .attr("x1", (385 - ((lineWidth / (widthDomainAppearances[1])) * (data[1].Appearances))))
        .attr("y1", 150)
        .attr("x2", 385)
        .attr("y2", 150);


    svg1.append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 385)
        .attr("y", 140)
        .attr("fill", "#D30208");

    // First Row Right
    svg1.append("line")
        .attr("x1", 415)
        .attr("y1", 150)
        .attr("x2", 740)
        .attr("y2", 150)
        .attr("stroke", "#E5C685")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 20);

    svg1.append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 405)
        .attr("y", 140)
        .attr("fill", "E5C685");

    svg1.append("line")
        .attr("x1", 415)
        .attr("y1", 150)
        .attr("x2", 415)
        .attr("y2", 150)
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("x2", 415 )
                .transition()
                .duration(1000)
                .attr("x2", ( (415 + (lineWidth / (widthDomainAppearances[1])) * (data[15].Appearances ) ) ) )
        })
        .attr("stroke", "#D30208")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 20)
        .transition()
        .duration(500)
        .attr("x1", (415))
        .attr("y1", 150)
        .attr("x2", 415 + (lineWidth / (widthDomainAppearances[1])) * (data[15].Appearances))
        .attr("y2", 150);

    svg1.append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 405)
        .attr("y", 140)
        .attr("fill", "#D30208");
});