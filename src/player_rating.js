// create svg canvas
const svg4 = d3.select("#player-stats-rating").append("svg")
    .attr("width", canvPlayerWidth)
    .attr("height", canvPlayerHeight);

d3.csv("./data/World_cup_2018_players_complete.csv").then(function (data) {
    const widthDomainRating = d3.extent(data, d => Number(d.Rating));
    console.log(widthDomainRating);

    // Background Color
    svg4.append("rect")
        .attr("width", canvPlayerWidth)
        .attr("height", canvPlayerHeight)
        .attr("fill", "#F5EED5");

    // Texts Title
    svg4.append("text")
        .attr("y", 55)
        .attr("x", 55)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "left")
        .attr("font-weight", "bold")
        .attr("fill", "#171714")
        .text("Goals");

    svg4.append("text")
        .attr("y", 55)
        .attr("x", 140)
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .style("text-anchor", "start")
        .attr("fill", "grey")
        .text("What is the ...")
        .on("mouseover", function (d, i) {
            d3.select(this).transition()
                .style("opacity", 0)
                .transition()
                .text("What is the players rating overall.")
                .duration("300")
                .style("opacity", 1)
                .transition()
                .duration("300")
        })
        .on("mouseout", function (d, i) {
            d3.select(this).transition()
                .style("opacity", 0)
                .transition()
                .text("What is the ...")
                .duration("300")
                .style("opacity", 1)
                .transition()
                .duration("300")
        });

    // Texts Numbers
    svg4.append("text")
        .attr("y", 115)
        .attr("x", 55)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "left")
        .text(data[1].Rating);

    svg4.append("text")
        .attr("y", 115)
        .attr("x", 740)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "right")
        .text(data[15].Rating);

    // Texts Player Labels
    svg4.append("text")
        .attr("y", 115)
        .attr("x", 389)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "end")
        .text(data[45].Player);

    svg4.append("text")
        .attr("y", 115)
        .attr("x", 409)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .style("text-anchor", "start")
        .text(data[15].Player);

    // First Row Left
    svg4.append("line")
        .attr("x1", 60)
        .attr("y1", 150)
        .attr("x2", 385)
        .attr("y2", 150)
        .attr("stroke", "#E5C685")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 20);

    svg4.append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 385)
        .attr("y", 140)
        .attr("fill", "grey");

    svg4.append("line")
        .attr("x1", 385)
        .attr("y1", 150)
        .attr("x2", 385)
        .attr("y2", 150)
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("x1", 380)
                .transition()
                .duration(1000)
                .attr("x1", (385 - ((lineWidth / (widthDomainRating[1])) * (data[1].Rating))))
        })
        .attr("stroke", "#D30208")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 20)
        .transition()
        .duration(500)
        .attr("x1", (385 - ((lineWidth / (widthDomainRating[1])) * (data[1].Rating))))
        .attr("y1", 150)
        .attr("x2", 385)
        .attr("y2", 150);


    svg4.append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 385)
        .attr("y", 140)
        .attr("fill", "#D30208");

    // First Row Right
    svg4.append("line")
        .attr("x1", 415)
        .attr("y1", 150)
        .attr("x2", 740)
        .attr("y2", 150)
        .attr("stroke", "#E5C685")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 20);

    svg4.append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 405)
        .attr("y", 140)
        .attr("fill", "E5C685");

    svg4.append("line")
        .attr("x1", 415)
        .attr("y1", 150)
        .attr("x2", 415)
        .attr("y2", 150)
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("x2", 415)
                .transition()
                .duration(1000)
                .attr("x2", ((415 + (lineWidth / (widthDomainRating[1])) * (data[15].Rating))))
        })
        .attr("stroke", "#D30208")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 20)
        .transition()
        .duration(500)
        .attr("x1", (415))
        .attr("y1", 150)
        .attr("x2", 415 + (lineWidth / (widthDomainRating[1])) * (data[15].Rating))
        .attr("y2", 150);

    svg4.append("rect")
        .attr("width", 10)
        .attr("height", 20)
        .attr("x", 405)
        .attr("y", 140)
        .attr("fill", "#D30208");
});