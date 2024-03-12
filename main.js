const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = screenWidth / 2 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const dimensions = [
    "GDP (current US$)",
    "Individuals using the Internet (% of population)",
    "Exports of goods and services (% of GDP)",
    "Industry (including construction) value added (constant 2015 US$)",
    "Foreign direct investment net inflows (% of GDP)"
]
const dimensionLabels = {
    'GDP (current US$)': 'GDP',
    'Individuals using the Internet (% of population)': 'Internet Users',
    'Exports of goods and services (% of GDP)': 'Exports',
    'Industry (including construction) value added (constant 2015 US$)': 'Industry Value Added',
    'Foreign direct investment net inflows (% of GDP)': 'FDI Inflows'
}
const options = [
    "Individuals using the Internet (% of population)",
    "Exports of goods and services (% of GDP)",
    "Industry (including construction) value added (constant 2015 US$)",
    "Foreign direct investment net inflows (% of GDP)"
]
const optionLabels = {
    "Individuals using the Internet (% of population)": "Individuals using the Internet (% of population)",
    "Exports of goods and services (% of GDP)": "Exports of goods and services (% of GDP)",
    "Industry (including construction) value added (constant 2015 US$)": "Industry value added (constant 2015 US$)",
    "Foreign direct investment net inflows (% of GDP)": "Foreign direct investment net inflows (% of GDP)"
}
const barOptions = {
    "GDP (current US$)": "GDP",
    "Individuals using the Internet (% of population)": "Internet",
    "Exports of goods and services (% of GDP)": "Exports",
    "Industry (including construction) value added (constant 2015 US$)": "Industry",
    "Foreign direct investment net inflows (% of GDP)": "FDI"
}
const barLabels = {
    "GDP": "GDP (current US$) over time",
    "Internet": "Individuals using the Internet (% of population) over time",
    "Exports": "Exports of goods and services (% of GDP) over time",
    "Industry": "Industry (including construction) value added (constant 2015 US$) over time",
    "FDI": "Foreign direct investment net inflows (% of GDP) over time"
}

d3.select('#line_selector')
    .selectAll("options")
    .data(options)
    .enter()
    .append('option')
    .text(function (d) { return d; })
    .attr("value", function (d) {
        return d
    })

// line graphs
d3.csv("data/india_dataset.csv").then(rawData => {
    rawData = rawData.map(d => {
        return {
            "IndicatorName": d.IndicatorName,
            "IndicatorCode": d.IndicatorCode,
            "1993": Number(d["1993"]),
            "1994": Number(d["1994"]),
            "1995": Number(d["1995"]),
            "1996": Number(d["1996"]),
            "1997": Number(d["1997"]),
            "1998": Number(d["1998"]),
            "1999": Number(d["1999"]),
            "2000": Number(d["2000"]),
            "2001": Number(d["2001"]),
            "2002": Number(d["2002"]),
            "2003": Number(d["2003"]),
            "2004": Number(d["2004"]),
            "2005": Number(d["2005"]),
            "2006": Number(d["2006"]),
            "2007": Number(d["2007"]),
            "2008": Number(d["2008"]),
            "2009": Number(d["2009"]),
            "2010": Number(d["2010"]),
            "2011": Number(d["2011"]),
            "2012": Number(d["2012"]),
            "2013": Number(d["2013"]),
            "2014": Number(d["2014"]),
            "2015": Number(d["2015"]),
            "2016": Number(d["2016"]),
            "2017": Number(d["2017"]),
            "2018": Number(d["2018"]),
            "2019": Number(d["2019"]),
            "2020": Number(d["2020"]),
            // "2021": Number(d["2021"]),
            // "2022": Number(d["2022"])
        }

    })
    console.log(rawData)
    var svg = d3.select("#line-graph")
        .append("svg")
        .attr("width", width + 60)
        .attr("height", height + 60)
        .attr("transform", `translate(${margin.left}, ${margin.top + 20})`)

    // x axis
    svg.append("text")
        .classed("x_label", true)
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Individuals using the Internet (% of population)")

    // y axis
    svg.append("text")
        .attr("x", -(height / 2))
        .attr("y", 15)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("GDP (current US$)")

    // x scale 
    let x1 = d3.scaleLinear()
        .domain([d3.min(rawData, function (d) {
            if (d.IndicatorName == "Individuals using the Internet (% of population)") {
                let min_value = Infinity
                for (let i = 1993; i <= 2020; i++) {
                    if (d[i] < min_value) {
                        min_value = d[i]
                    }
                }
                return min_value
            }
        }), d3.max(rawData, function (d) {
            if (d.IndicatorName == "Individuals using the Internet (% of population)") {
                let max_value = 0
                for (let i = 1993; i <= 2020; i++) {
                    if (d[i] > max_value) {
                        max_value = d[i]
                    }
                }
                return max_value
            }
        })])
        .range([0, width])

    let xAxisCall = d3.axisBottom(x1)
        .ticks(7)
    svg.append("g")
        .classed("x_axis", true)
        .attr("transform", `translate(${50}, ${height})`)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "0")
        .attr("text-anchor", "middle")

    // y scale
    let y1 = d3.scaleLinear()
        .domain([d3.max(rawData, function (d) {
            if (d.IndicatorCode == "EG.ELC.ACCS.ZS") {
                let max_value = 0
                for (let i = 1993; i <= 2020; i++) {
                    if (d[i] > max_value) {
                        max_value = d[i]
                    }
                }
                return max_value
            }
        }), d3.min(rawData, function (d) {
            if (d.IndicatorCode == "EG.ELC.ACCS.ZS") {
                let min_value = Infinity
                for (let i = 1993; i <= 2020; i++) {
                    if (d[i] < min_value) {
                        min_value = d[i]
                    }
                }
                console.log(min_value)
                return min_value
            }
        })])
        .range([0, height])

    let yAxisCall = d3.axisLeft(y1)
        .ticks(13)
    svg.append("g").attr("transform", `translate(${50}, ${0})`).call(yAxisCall)

    const filteredData = rawData.filter(d => d.IndicatorName === "Individuals using the Internet (% of population)" || d.IndicatorCode === "EG.ELC.ACCS.ZS")
    let grpah1dataPoints = []

    for (let i = 1993; i <= 2020; i++) {
        let graph1point = [filteredData[1][i], filteredData[0][i]]
        grpah1dataPoints.push(graph1point)
    }
    console.log(grpah1dataPoints)
    let graph_path =
        svg.append("path")
            .datum(grpah1dataPoints)
            .attr("transform", `translate(${50}, ${0})`)
            .attr("fill", "none")
            .attr("stroke", "#138808")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) {
                    return x1(d[0])
                }).y(function (d) {
                    return y1(d[1])
                }))

    let length = graph_path.node().getTotalLength()

    graph_path.attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(5000)
        .attr("stroke-dashoffset", 0)

    // add the X Axis from selector
    d3.select('#line_selector').on("change", function (d) {
        let new_option = d3.select(this).property("value")
        console.log("here")

        x1.domain([d3.min(rawData, function (d) {
            if (d.IndicatorName == new_option) {
                let min_value = Infinity
                for (let i = 1993; i <= 2020; i++) {
                    if (d[i] != 0) {
                        console.log(d[i])
                        if (d[i] < min_value) {
                            min_value = d[i]
                        }
                    }
                }
                return min_value
            }
        }), d3.max(rawData, function (d) {
            if (d.IndicatorName == new_option) {
                let max_value = 0
                for (let i = 1993; i <= 2020; i++) {
                    if (d[i] > max_value) {
                        max_value = d[i]
                    }
                }
                return max_value
            }
        })])
        xAxisCall = d3.axisBottom(x1)
            .ticks(7)

        svg.selectAll(".x_axis").transition().duration(5000).call(xAxisCall)

        let updatedFilteredData = rawData.filter(d => d.IndicatorName === new_option || d.IndicatorCode === "EG.ELC.ACCS.ZS")

        let updated1dataPoints = []

        console.log(updatedFilteredData)

        if (updatedFilteredData[1]["IndicatorName"] == "GDP (current US$)") {
            for (let i = 1993; i <= 2020; i++) {
                if (updatedFilteredData[1][i] != 0) {
                    let updated1point = [updatedFilteredData[0][i], updatedFilteredData[1][i]]
                    updated1dataPoints.push(updated1point)
                }
            }
        } else {
            for (let i = 1993; i <= 2020; i++) {
                if (updatedFilteredData[1][i] != 0) {
                    let updated1point = [updatedFilteredData[1][i], updatedFilteredData[0][i]]
                    updated1dataPoints.push(updated1point)
                }
            }
        }
        console.log(updated1dataPoints)

        graph_path.datum(updated1dataPoints)
            .attr("d", d3.line()
                .x(function (d) {
                    return x1(d[0])
                }).y(function (d) {
                    return y1(d[1])
                }))
            .attr("stroke", "#138808")

        let length = graph_path.node().getTotalLength()

        graph_path.attr("stroke-dasharray", length + " " + length)
            .attr("stroke-dashoffset", length)
            .transition()
            .duration(5000)
            .attr("stroke-dashoffset", 0)

        svg.selectAll(".x_label").remove()

        svg.append("text")
            .classed("x_label", true)
            .attr("x", width / 2)
            .attr("y", height + 40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text(optionLabels[new_option])
    })
})

// parallel coordinates plot
d3.csv("data/india_dataset_gdpindicators.csv").then(rawData => {

    let data = rawData.map(d => {
        return dimensions.reduce((acc, dimension) => {
            acc[dimension] = +d[dimension];
            return acc;
        }, {});
    });

    var margin = { top: 60, right: 10, bottom: 30, left: 10 },
        width = screenWidth - margin.left - margin.right,
        height = screenHeight / 2 - margin.top - margin.bottom;

    var svg = d3.select("#parallel-coordinates").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var yScales = {};
    dimensions.forEach(function (dimension) {
        yScales[dimension] = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return +d[dimension]; }))
            .range([height, 0]);
    });

    // x axis 
    var xScale = d3.scalePoint()
        .range([0, width])
        .padding(1)
        .domain(dimensions);

    svg.selectAll("myPath")
        .data(data)
        .enter()
        .append("path")
        .attr("d", function (d) {
            return d3.line()(dimensions.map(function (p) { return [xScale(p), yScales[p](d[p])]; }));
        })
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("opacity", 0.5);

    // !!!!!!!!!   https://d3-graph-gallery.com/graph/parallel_custom.html    !!!!!

    // dimensions.forEach(function (d) {
    //     svg.append("g")
    //         .attr("transform", "translate(" + xScale(d) + ")")
    //         .each(function (d) { d3.select(this).call(d3.axisLeft().scale(yScales[d])); })
    //         .append("text")
    //         .style("text-anchor", "middle")
    //         .attr("y", -9)
    //         .text(function (d) { return d; });
    // });

    svg.selectAll(".axis")
        .data(dimensions).enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + xScale(d) + ")"; })
        .each(function (d) {
            d3.select(this).call(d3.axisLeft(yScales[d]));
        })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", height + margin.bottom - 10)
        .text(function (d) { return dimensionLabels[d]; })
        .style("font-weight", "bold")
        .style("fill", "black")
        .style("font-size", "14px");
})

d3.select('#bar_selector')
    .selectAll("options")
    .data(dimensions)
    .enter()
    .append('option')
    .text(function (d) { return d; })
    .attr("value", function (d) {
        return d
    })

// bar charts - select between the indicators
d3.csv("data/india_dataset_gdpindicators.csv").then(rawData => {
    let data = rawData.map(d => ({
        Year: d.Year,
        GDP: +d["GDP (current US$)"],
        Internet: +d["Individuals using the Internet (% of population)"],
        Exports: +d["Exports of goods and services (% of GDP)"],
        Industry: +d["Industry (including construction) value added (constant 2015 US$)"],
        FDI: +d["Foreign direct investment net inflows (% of GDP)"]
    }));
    console.log(data)

    var margin = { top: 30, right: 140, bottom: 60, left: 90 },
        width = screenWidth / 2 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    var svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    function updateChart(selectedOption) {
        // Clear existing bars
        svg.selectAll(".bar").remove();
        console.log(selectedOption)

        // Recalculate y domain based on selected option
        y.domain([0, d3.max(data, d => d[selectedOption])]);

        // Redraw bars
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .transition()
            .duration(5000)
            .attr("x", d => x(d.Year))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d[selectedOption]))
            .attr("height", d => height - y(d[selectedOption]))
            .style("fill", "orange")

        svg.select(".y-axis").transition().duration(5000).call(d3.axisLeft(y));

        // tooltip
        svg.selectAll(".bar")
            .on("mouseover", function (d) {
                d3.select("#tooltip")
                    .style("visibility", "visible")
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px")
                    .html(`Year: ${d.Year}<br>${selectedOption}: ${d[selectedOption]}`);
            })
            .on("mousemove", function (event) {
                d3.select("#tooltip")
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                d3.select("#tooltip")
                    .style("visibility", "hidden");
            });

        let chartTitle = svg.selectAll(".chart-title").data([selectedOption]);

        // Update the title text if it exists
        chartTitle
            .text(barLabels[selectedOption]);

        // bar chart title
        chartTitle.enter()
            .append("text")
            .attr("class", "chart-title")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text(barLabels[selectedOption]);

    }

    // Initial chart setup
    x.domain(data.map(d => d.Year));
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Initial chart rendering for default option
    updateChart(barOptions["GDP (current US$)"]);

    // Dropdown change event listener
    d3.select('#bar_selector').on("change", function (d) {
        let selectedOption = d3.select(this).property("value");
        updateChart(barOptions[selectedOption]);
    });
});