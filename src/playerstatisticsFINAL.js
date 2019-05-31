const canvPlayerHeight = 75;

const svgPlayerInfoLeft = d3.select("#player-picture-left").append("svg")
    .attr("width", "100%")
    .attr("height", 200)
    .style("horizontal-align", "middle");

const svgPlayerInfoRight = d3.select("#player-picture-right").append("svg")
    .attr("width", "100%")
    .attr("height", 200)
    .style("horizontal-align", "middle");

const svgAppreances = d3.select("#player-stats-appearances").append("svg")
    .attr("width", "100%")
    .attr("height", canvPlayerHeight)
    .style("horizontal-align", "middle");

const svgGoals = d3.select("#player-stats-goals").append("svg")
    .attr("width", "100%")
    .attr("height", canvPlayerHeight)
    .style("horizontal-align", "middle");

const svgCaps = d3.select("#player-stats-caps").append("svg")
    .attr("width", "100%")
    .attr("height", canvPlayerHeight)
    .style("horizontal-align", "middle");

const svgMinutes = d3.select("#player-stats-minutes").append("svg")
    .attr("width", "100%")
    .attr("height", canvPlayerHeight)
    .style("horizontal-align", "middle");

const svgRating = d3.select("#player-stats-rating").append("svg")
    .attr("width", "100%")
    .attr("height", canvPlayerHeight)
    .style("horizontal-align", "middle");


d3.csv("./data/World_cup_2018_players_complete.csv").then(function (data) {
    
    window.initialiseFirstPlayerOnTeamChange = function(selectedTeam, direction) {

    var initialLeft = d3.select("#select-player-button-left").property("value")
    var initialRight = d3.select("#select-player-button-right").property("value")

    var initialSelectionLeft = data.filter(function (d) { return d.FullName == initialLeft })
    var initialSelectionRight = data.filter(function (d) { return d.FullName == initialRight })

    console.log("INITIALWERTE", initialSelectionLeft)

   
    console.log("Name", data[15].FullName)

    var currentWidth = parseInt(d3.select("#player-stats-appearances").style("width"));

    var startXLineRight = (currentWidth / 2) - 80;
    var startXLineLeft = (currentWidth / 2) + 80;

    console.log(window.innerWidth);
    console.log(svgAppreances.style("width"));

    const widthDomainAppearances = d3.extent(data, d => Number(d.Appearances));
    const widthDomainGoals = d3.extent(data, d => Number(d.Goals));
    const widthDomainCaps = d3.extent(data, d => Number(d.Caps));
    const widthDomainMinutes = d3.extent(data, d => Number(d.Minutes));
    const widthDomainRating = d3.extent(data, d => Number(d.Rating));

    function playerInfoLeft(svg, playerImage, playerName, playerPosition, playerAge, playerValue, playerClub) {
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("alignment-baseline", "middle")
            .attr("fill", "white");

        svg.append("image")
            .attr("x", "10%")
            .attr("y", "20%")
            .attr("transform", "translate(-50, -50)")
            .data(data)
            .attr("id", "player-left-image")
            .attr("xlink:href", playerImage)
            .attr("width", 170)
            .attr("height", 170);

        svg.append("image")
            .attr("x", "11.5%")
            .attr("y", "110%")
            .attr("transform", "translate(-50, -50)")
            .attr("id", "player-left-line")
            .attr("xlink:href", "./images/player_line.svg")
            .attr("width", 150)
            .attr("height", 16.91);

        svg.append("text")
            .attr("x", "38%")
            .attr("y", "25%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "100%")
            .attr("font-weight", "lighter")
            .attr("letter-spacing", 1)
            .attr("fill", "grey")
            .text("AGE");

        svg.append("text")
            .attr("x", "38%")
            .attr("y", "40%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "190%")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .attr("fill", "#BDB289")
            .text(playerAge);

        svg.append("text")
            .attr("x", "50%")
            .attr("y", "25%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "100%")
            .attr("font-weight", "lighter")
            .attr("letter-spacing", 1)
            .attr("fill", "grey")
            .text("POSITION");

        svg.append("text")
            .attr("x", "50%")
            .attr("y", "40%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "190%")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .attr("fill", "#BDB289")
            .text(playerPosition);

        svg.append("text")
            .attr("x", "70%")
            .attr("y", "25%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "100%")
            .attr("font-weight", "lighter")
            .attr("letter-spacing", 1)
            .attr("fill", "grey")
            .text("VALUE");

        svg.append("text")
            .attr("x", "70%")
            .attr("y", "40%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "190%")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .attr("fill", "#BDB289")
            .text(playerValue);

        svg.append("text")
            .attr("x", "38%")
            .attr("y", "63%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "70%")
            .attr("font-weight", "lighter")
            .attr("letter-spacing", 1)
            .attr("fill", "grey")
            .text(playerClub.toUpperCase());

        svg.append("text")
            .attr("x", "38%")
            .attr("y", "80%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "240%")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .attr("fill", "#171714")
            .text(playerName.toUpperCase());
    }

    function playerInfoRight(svg, playerImage, playerName, playerPosition, playerAge, playerValue, playerClub) {
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("alignment-baseline", "middle")
            .attr("fill", "white");

        svg.append("image")
            .attr("x", "75%")
            .attr("y", "20%")
            .attr("transform", "translate(-50, -50)")
            .data(data)
            .attr("id", "player-right-image")
            .attr("xlink:href", playerImage)
            .attr("width", 170)
            .attr("height", 170);

        svg.append("image")
            .attr("x", "76.5%")
            .attr("y", "110%")
            .attr("transform", "translate(-50, -50)")
            .attr("id", "player-right-line")
            .attr("xlink:href", "./images/player_line.svg")
            .attr("width", 150)
            .attr("height", 16.91);

        svg.append("text")
            .attr("x", "10%")
            .attr("y", "25%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "100%")
            .attr("font-weight", "lighter")
            .attr("letter-spacing", 1)
            .attr("fill", "grey")
            .text("AGE");

        svg.append("text")
            .attr("x", "10%")
            .attr("y", "40%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "190%")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .attr("fill", "#BDB289")
            .text(playerAge);

        svg.append("text")
            .attr("x", "22%")
            .attr("y", "25%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "100%")
            .attr("font-weight", "lighter")
            .attr("letter-spacing", 1)
            .attr("fill", "grey")
            .text("POSITION");

        svg.append("text")
            .attr("x", "22%")
            .attr("y", "40%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "190%")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .attr("fill", "#BDB289")
            .text(playerPosition);

        svg.append("text")
            .attr("x", "42%")
            .attr("y", "25%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "100%")
            .attr("font-weight", "lighter")
            .attr("letter-spacing", 1)
            .attr("fill", "grey")
            .text("VALUE");

        svg.append("text")
            .attr("x", "42%")
            .attr("y", "40%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "190%")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .attr("fill", "#BDB289")
            .text(playerValue);

        svg.append("text")
            .attr("x", "10%")
            .attr("y", "63%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "70%")
            .attr("font-weight", "lighter")
            .attr("letter-spacing", 1)
            .attr("fill", "grey")
            .text(playerClub.toUpperCase());

        svg.append("text")
            .attr("x", "10%")
            .attr("y", "80%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "240%")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .attr("fill", "#171714")
            .text(playerName.toUpperCase());
    }

    function playerBar(svg, barTitle, barDetails, scorePlayerLeft, scorePlayerRight,
        widthDomain, startXLineRight, startXLineLeft) {

        var containerWidth = currentWidth;
        var endXLineRight = ((containerWidth / 10));
        var endXLineLeft = ((containerWidth / 10) * 9)
        var endXScoreLineRight = (((startXLineRight - endXLineRight) / widthDomain[1]) * scorePlayerLeft);
        var endXScoreLineLeft = (((endXLineLeft - startXLineLeft) / widthDomain[1]) * scorePlayerRight) + (containerWidth / 2) + 80;

        console.log("EndXLine", endXLineRight);
        console.log("EndXScoreLineRight", endXScoreLineRight);
        console.log("EndScoreLineLeft", endXScoreLineLeft)
        console.log("ENDXLINE", endXLineLeft)
        console.log("StartXLineLeft", startXLineLeft);
        console.log("Property", containerWidth);

        // Background Color
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("alignment-baseline", "middle")
            .attr("fill", "white");

        // Texts Title
        svg.append("text")
            .attr("x", "50%")
            .attr("y", "55%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "120%")
            .style("text-anchor", "middle")
            .attr("font-weight", "bold")
            .attr("fill", "#171714")
            .text(barTitle);

        // svg.append("text")
        //     .attr("y", 55)
        //     .attr("x", 190)
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", "15px")
        //     .style("text-anchor", "start")
        //     .attr("fill", "grey")
        //     .text("How many times...")
        //     .on("mouseover", function (d, i) {
        //         d3.select(this).transition()
        //             .style("opacity", 0)
        //             .transition()
        //             .text(barDetails)
        //             .duration("300")
        //             .style("opacity", 1)
        //             .transition()
        //             .duration("300")
        //     })
        //     .on("mouseout", function (d, i) {
        //         d3.select(this).transition()
        //             .style("opacity", 0)
        //             .transition()
        //             .text("How many times ...")
        //             .duration("300")
        //             .style("opacity", 1)
        //             .transition()
        //             .duration("300")
        //     });

        // Texts Numbers
        svg.append("text")
            .attr("y", "55%")
            .attr("x", "8%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .style("text-anchor", "end")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .text(scorePlayerLeft);

        svg.append("text")
            .attr("y", "55%")
            .attr("x", "93%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .style("text-anchor", "start")
            .attr("font-family", "dusha")
            .style("font-weight", "bold")
            .text(scorePlayerRight);

        // First Row Left
        svg.append("line")
            .attr("x1", endXLineRight)
            .attr("y1", "47%")
            .attr("x2", startXLineRight)
            .attr("y2", "47%")
            .attr("stroke", "rgb(244, 244, 244)")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 20);

        svg.append("line")
            .attr("x1", startXLineRight)
            .attr("y1", "47%")
            .attr("x2", startXLineRight)
            .attr("y2", "47%")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("x1", startXLineRight)
                    .transition()
                    .duration(1000)
                    .attr("x1", startXLineRight - endXScoreLineRight)
            })
            .transition()
            .duration(500)
            .attr("x1", startXLineRight - endXScoreLineRight)
            .attr("y1", "47%")
            .attr("x2", startXLineRight)
            .attr("y2", "47%")
            .attr("stroke", "#D30208")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 20);


        svg.append("rect")
            .attr("width", 12)
            .attr("height", 20)
            .attr("x", startXLineRight)
            .attr("y", "33.65%")
            .attr("fill", "#D30208");



        // First Row Right
        svg.append("line")
            .attr("x1", startXLineLeft)
            .attr("y1", "47%")
            .attr("x2", endXLineLeft)
            .attr("y2", "47%")
            .attr("stroke", "rgb(244, 244, 244)")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 20);

        svg.append("line")
            .attr("x1", startXLineLeft)
            .attr("y1", "47%")
            .attr("x2", startXLineLeft)
            .attr("y2", "47%")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("x1", startXLineLeft)
                    .transition()
                    .duration(1000)
                    .attr("x1", endXScoreLineLeft)
            })
            .transition()
            .duration(500)
            .attr("x1", endXScoreLineLeft)
            .attr("y1", "47%")
            .attr("x2", startXLineLeft)
            .attr("y2", "47%")
            .attr("stroke", "#D30208")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 20);

        svg.append("rect")
            .attr("width", 12)
            .attr("height", 20)
            .attr("x", startXLineLeft - 9.9)
            .attr("y", "33.65%")
            .attr("fill", "#D30208");

        // Balken-Texts
        svg.append("line")
            .attr("x1", endXLineRight + 3)
            .attr("y1", "30%")
            .attr("x2", endXLineRight + 3)
            .attr("y2", "90%")
            .attr("stroke", "grey")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 0.5);

        svg.append("text")
            .attr("y", "90%")
            .attr("x", endXLineRight + 7)
            .attr("fill", "grey")
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .style("text-anchor", "start")
            .text(widthDomain[1] + " " + barTitle);
    }

    function initializeStats(startXLineRight, startXLineLeft) {
        playerInfoLeft(svgPlayerInfoLeft, initialSelectionLeft[0]["Photo"], initialSelectionLeft[0]["Player"], initialSelectionLeft[0]["Position"], initialSelectionLeft[0]["Age"], initialSelectionLeft[0]["Value"], initialSelectionLeft[0]["Club"]);
        playerInfoRight(svgPlayerInfoRight, initialSelectionRight[0]["Photo"], initialSelectionRight[0]["Player"], initialSelectionRight[0]["Position"], initialSelectionRight[0]["Age"], initialSelectionRight[0]["Value"], initialSelectionRight[0]["Club"]);

        playerBar(svgAppreances, "Appearances", "How many times a player has appeared in all of the games.",
            initialSelectionLeft[0]["Appearances"], initialSelectionRight[0]["Appearances"],
            widthDomainAppearances,
            startXLineRight, startXLineLeft);
        playerBar(svgGoals, "Goals", "How many ...",
            initialSelectionLeft[0]["Goals"], initialSelectionRight[0]["Goals"],
            widthDomainGoals,
            startXLineRight, startXLineLeft);
        playerBar(svgCaps, "Caps", "How many ...",
            initialSelectionLeft[0]["Caps"], initialSelectionRight[0]["Caps"],
            widthDomainCaps,
            startXLineRight, startXLineLeft);
        playerBar(svgMinutes, "Minutes", "How many ...",
            initialSelectionLeft[0]["Minutes"], initialSelectionRight[0]["Minutes"],
            widthDomainMinutes,
            startXLineRight, startXLineLeft);
        playerBar(svgRating, "Rating", "How many ...",
            initialSelectionLeft[0]["Rating"], initialSelectionRight[0]["Rating"],
            widthDomainRating,
            startXLineRight, startXLineLeft);
    }
   
    initializeStats(startXLineRight, startXLineLeft);

    window.addEventListener('resize', function () {
        currentWidth = parseInt(d3.select("#player-stats-appearances").style("width"));
        startXLineRight = (currentWidth / 2) - 80;
        startXLineLeft = (currentWidth / 2) + 80;
        initializeStats(startXLineRight, startXLineLeft);

    });



    // Updates all values
    function updatePlayer(selectedPlayer, check, otherPlayer) {

        var selectedTeamPlayer = data.filter(function (d) { return d.FullName == selectedPlayer })
        var unchangedTeamPlayer = data.filter(function (d) { return d.FullName == otherPlayer })

        if (check == 1) {
            playerInfoLeft(svgPlayerInfoLeft, selectedTeamPlayer[0]["Photo"], selectedTeamPlayer[0]["Player"], selectedTeamPlayer[0]["Position"], selectedTeamPlayer[0]["Age"], selectedTeamPlayer[0]["Value"], selectedTeamPlayer[0]["Club"]);
            playerBar(svgAppreances, "Appearances", "How many times a player has appeared in all of the games.",
                selectedTeamPlayer[0]["Appearances"], unchangedTeamPlayer[0]["Appearances"],
                widthDomainAppearances,
                startXLineRight, startXLineLeft);
            playerBar(svgGoals, "Goals", "How many ...",
                selectedTeamPlayer[0]["Goals"], unchangedTeamPlayer[0]["Goals"],
                widthDomainGoals,
                startXLineRight, startXLineLeft);
            playerBar(svgCaps, "Caps", "How many ...",
                selectedTeamPlayer[0]["Caps"], unchangedTeamPlayer[0]["Caps"],
                widthDomainCaps,
                startXLineRight, startXLineLeft);
            playerBar(svgMinutes, "Minutes", "How many ...",
                selectedTeamPlayer[0]["Minutes"], unchangedTeamPlayer[0]["Minutes"],
                widthDomainMinutes,
                startXLineRight, startXLineLeft);
            playerBar(svgRating, "Rating", "How many ...",
                selectedTeamPlayer[0]["Rating"], unchangedTeamPlayer[0]["Rating"],
                widthDomainRating,
                startXLineRight, startXLineLeft);
        } else {
            playerInfoRight(svgPlayerInfoRight, selectedTeamPlayer[0]["Photo"], selectedTeamPlayer[0]["Player"], selectedTeamPlayer[0]["Position"], selectedTeamPlayer[0]["Age"], selectedTeamPlayer[0]["Value"], selectedTeamPlayer[0]["Club"]);
            playerBar(svgAppreances, "Appearances", "How many times a player has appeared in all of the games.",
                unchangedTeamPlayer[0]["Appearances"], selectedTeamPlayer[0]["Appearances"],
                widthDomainAppearances,
                startXLineRight, startXLineLeft);
            playerBar(svgGoals, "Goals", "How many ...",
                unchangedTeamPlayer[0]["Goals"], selectedTeamPlayer[0]["Goals"],
                widthDomainGoals,
                startXLineRight, startXLineLeft);
            playerBar(svgCaps, "Caps", "How many ...",
                unchangedTeamPlayer[0]["Caps"], selectedTeamPlayer[0]["Caps"],
                widthDomainCaps,
                startXLineRight, startXLineLeft);
            playerBar(svgMinutes, "Minutes", "How many ...",
                unchangedTeamPlayer[0]["Minutes"], selectedTeamPlayer[0]["Minutes"],
                widthDomainMinutes,
                startXLineRight, startXLineLeft);
            playerBar(svgRating, "Rating", "How many ...",
                unchangedTeamPlayer[0]["Rating"], selectedTeamPlayer[0]["Rating"],
                widthDomainRating,
                startXLineRight, startXLineLeft);
        }

    }

     // When the button is changed, run the updateChart function
     d3.select("#select-player-button-left").on("change", function (d) {
        var selectedOption = d3.select(this).property("value")
        var rightOption = d3.select("#select-player-button-right").property("value")
        var left = 1
        updatePlayer(selectedOption, left, rightOption)
    })

    // When the button is changed, run the updateChart function
    d3.select("#select-player-button-right").on("change", function (d) {
        var selectedOption = d3.select(this).property("value")
        var leftOption = d3.select("#select-player-button-left").property("value")
        var left = 0
        updatePlayer(selectedOption, left, leftOption)
    })
    
}

// Initialise with first countries (no selection done yet)
window.initialiseFirstPlayerOnTeamChange()



});
