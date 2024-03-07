const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = screenWidth - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const options = ["Access to electricity (% of population)", "CO2 emissions (metric tons per capita)", "Individuals using the Internet (% of population)", "Population", "Renewable energy consumption (% of total final energy consumption)", "Exports of goods and services (% of GDP)", "Foreign direct investment net (BoP current US$)", "Foreign direct investment net inflows (% of GDP)", "Population growth (annual %)",
"Central government debt total (% of GDP)", "GNI (current US$)", "Net trade in goods and services (BoP current US$)", "Unemployment total (% of total labor force) (modeled ILO estimate)", "School enrollment secondary (% gross)", "Computer communications and other services (% of commercial service imports)", "Urban population (% of total population)", "International tourism receipts (current US$)", "Agriculture forestry and fishing value added (constant 2015 US$)",
"Adjusted net national income (constant 2015 US$)", "Industry (including construction) value added (constant 2015 US$)", "Manufacturing value added (current US$)", "Agricultural land (sq. km)"]

d3.select('#selector')
.selectAll("options")
.data(options)
.enter()
.append('option')
.text(function (d) {return d})
.attr("value", function(d) {
    return d
})

d3.csv("data/india_dataset.csv").then(rawData =>{
    rawData = rawData.map(d => {
        return {
            "IndicatorName" : d.IndicatorName,
            "IndicatorCode" : d.IndicatorCode,
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
            "2021": Number(d["2021"]),
            "2022": Number(d["2022"])
        }
                        
    })
    console.log(rawData)
    var svg = d3.select("svg")

    const g1 = svg.append("g")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    g1.append("text")
    .classed("x_label", true)
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Access to electricity (% of population)")

    g1.append("text")
    .attr("x", -(height / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("GDP (current US$)")

    let x1 = d3.scaleLinear()
    .domain([d3.min(rawData, function(d) {
        if (d.IndicatorCode == "NY.GDP.MKTP.CD") {
            let min_value = Infinity
            for (let i = 1993; i <= 2021; i++) {
                if (d[i] < min_value) {
                    min_value = d[i]
                }
            }
        return min_value
        }
    }), d3.max(rawData, function(d) {
        if (d.IndicatorCode == "NY.GDP.MKTP.CD") {
            let max_value = 0
            for (let i = 1993; i <= 2021; i++) {
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
    g1.append("g")
    .classed("x_axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "0")
    .attr("text-anchor", "middle")

    let y1 = d3.scaleLinear()
    .domain([d3.max(rawData, function(d) {
        if (d.IndicatorCode == "EG.ELC.ACCS.ZS") {
            let max_value = 0
            for (let i = 1993; i <= 2021; i++) {
                if (d[i] > max_value) {
                    max_value = d[i]
                }
            }
            return max_value
        }
    }), d3.min(rawData, function(d) {
        if (d.IndicatorCode == "EG.ELC.ACCS.ZS") {
            let min_value = Infinity
            for (let i = 1993; i <= 2021; i++) {
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
    g1.append("g").call(yAxisCall)

    const filteredData =rawData.filter(d => d.IndicatorCode === "NY.GDP.MKTP.CD" || d.IndicatorCode === "EG.ELC.ACCS.ZS")

    let grpah1dataPoints = []

    for (let i = 1993; i <= 2021; i ++) {
        let graph1point = [filteredData[0][i], filteredData[1][i]]
        grpah1dataPoints.push(graph1point)
    }
    console.log(grpah1dataPoints)
        let graph_path = g1.append("path")
        .datum(grpah1dataPoints)
        .attr("fill", "none")
        .attr("stroke", "#138808")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) {
            return x1(d[0])
        }).y(function(d) {
            return y1(d[1])
        }))

        let length = graph_path.node().getTotalLength()

        graph_path.attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(5000)
        .attr("stroke-dashoffset", 0)

    d3.select('#selector').on("change", function(d) {
        let new_option = d3.select(this).property("value")
        console.log("here")

        x1.domain([d3.min(rawData, function(d) {
            if (d.IndicatorName == new_option) {
                let min_value = Infinity
                for (let i = 1993; i <= 2021; i++) {
                    if (d[i] != 0) {
                        console.log(d[i])
                        if (d[i] < min_value) {
                            min_value = d[i]
                        }
                    }
                }
            return min_value
            }
        }), d3.max(rawData, function(d) {
            if (d.IndicatorName == new_option) {
                let max_value = 0
                for (let i = 1993; i <= 2021; i++) {
                    if (d[i] > max_value) {
                        max_value = d[i]
                    }
                }
            return max_value
            }
        })])
        xAxisCall = d3.axisBottom(x1)
        .ticks(7)

        g1.selectAll(".x_axis").transition().duration(5000).call(xAxisCall)

        let updatedFilteredData = rawData.filter(d => d.IndicatorName === new_option || d.IndicatorCode === "EG.ELC.ACCS.ZS")

        let updated1dataPoints = []

        console.log(updatedFilteredData)

        if (updatedFilteredData[1]["IndicatorName"] == "GDP (current US$)") {
            for (let i = 1993; i <= 2021; i ++) {
                if (updatedFilteredData[1][i] != 0) {
                    let updated1point = [updatedFilteredData[0][i], updatedFilteredData[1][i]]
                    updated1dataPoints.push(updated1point)
                }
            }
        } else {
            for (let i = 1993; i <= 2021; i ++) {
                if (updatedFilteredData[1][i] != 0) {
                    let updated1point = [updatedFilteredData[1][i], updatedFilteredData[0][i]]
                    updated1dataPoints.push(updated1point)
                }
            }
        }
        console.log(updated1dataPoints)
        
        graph_path.datum(updated1dataPoints)
        .attr("d", d3.line()
        .x(function(d) {
            return x1(d[0])
        }).y(function(d) {
            return y1(d[1])
        }))
        .attr("stroke", "#138808")

        let length = graph_path.node().getTotalLength()

        graph_path.attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(5000)
        .attr("stroke-dashoffset", 0)

        g1.selectAll(".x_label").remove()

        g1.append("text")
        .classed("x_label", true)
        .attr("x", width / 2)
        .attr("y", height + 50)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(new_option)

    })
    }
)