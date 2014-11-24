/**
 * Created by jwshin on 11/21/2014.
 */
function barChartBasic() {
    var data = [4, 8, 15, 16, 23, 42];
    var width = 420,
        barHeight = 20;
    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, width]);
    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
            return "translate(0, " + i * barHeight + ")";
        });
    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1);
    bar.append("text")
        .attr("x", function (d) {
            return x(d) - 3;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d) {
            return d;
        });
}

function chartFromCSV() {
    var width = 800,
        height = 400,
        barWidth = 2;
    var x = d3.scale.linear()
        .range([0, width]);
    var y = d3.scale.linear()
        .range([0, height]);
    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", height);

    d3.csv("../data/productionRawData.csv", parser, function (error, data) {
        x.domain([0, barWidth * data.length]);
        y.domain([0, d3.max(data, function (d) { return parseFloat(d["Gas_Rate"]); })]);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + x(i * barWidth) + ", 0)";
            });
        bar.append("rect")
            .attr("y", function (d) { return height - y(parseFloat(d["Gas_Rate"]));})
            .attr("height", function (d) { return y(parseFloat(d["Gas_Rate"])); })
            .attr("width", barWidth - 1);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis);
    });

}

function parser(d) {
    return d;
}

