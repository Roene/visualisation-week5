/* Bronnen : 
https://beta.observablehq.com/@mbostock/d3-bar-chart
https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
https://jsfiddle.net/354zw0d2/9/
*/

// Data van genres per 5 jaar 
var data = [
  {
    "year":1998,
    "jongens":11.3,
    "meisjes":11.3
  },
  {
    "year":1999,
    "jongens":12.6,
    "meisjes":11.4
  },
  {
    "year":2000,
    "jongens":10.7,
    "meisjes":11.7
  },
  {
    "year":2001,
    "jongens":11.4,
    "meisjes":12.5
  },
  {
    "year":2002,
    "jongens":13.3,
    "meisjes":11.2
  },
  {
    "year":2003,
    "jongens":11.5,
    "meisjes":9.6
  },
  {
    "year":2004,
    "jongens":13.2,
    "meisjes":12.4
  },
  {
    "year":2005,
    "jongens":11.8,
    "meisjes":13.5
  },
  {
    "year":2006,
    "jongens":12.3,
    "meisjes":11.1
  },
  {
    "year":2007,
    "jongens":10.9,
    "meisjes":11.5
  },
  {
    "year":2008,
    "jongens":13.5,
    "meisjes":12.9
  },
  {
    "year":2009,
    "jongens":12.6,
    "meisjes":13.4
  }
]

// Hier wordt alles aan de svg meegegeven
// Padding bijvoorbeeld padding tussen bars en aantal ticks op de y as
var width = 1200
var height = 850
var margin = {top: 35, right: 25, bottom: 35, left: 50}
var paddingBars = .2
var ticks = {amount: 20, outerSize: 0}

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

// BRON : https://jsfiddle.net/354zw0d2/9/
var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(paddingBars)
var xScale1 = d3.scaleBand()
var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

// Ticks instellen op de assen
var xAxis = d3.axisBottom(xScale0).tickSizeOuter(ticks.outerSize)
var yAxis = d3.axisLeft(yScale).ticks(ticks.amount).tickSizeOuter(ticks.outerSize)

xScale0.domain(data.map(d => d.year))
xScale1.domain(['jongens', 'meisjes']).range([0, xScale0.bandwidth()])
yScale.domain([0, d3.max(data, d => d.jongens > d.meisjes ? d.jongens : d.meisjes)])
// EINDE BRON : https://jsfiddle.net/354zw0d2/9/

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var options = ["Jongens", "Meisjes"];

var year = svg.selectAll(".year")
  .data(data)
  .enter().append("g")
  .attr("class", "year")
  .attr("transform", d => `translate(${xScale0(d.year)},0)`)

// Bars voor sciencefiction worden hier gemaakt
year.selectAll(".jongens")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "jongens")
.style("fill","#0000FF")
  .attr("x", d => xScale1("jongens"))
  .attr("y", d => yScale(d.jongens))
  .attr("width", xScale1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.jongens)
  })
  .on("mouseover", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html("Jongens" + "<br>" + (d.jongens) + "%"); })
    .on("mouseout", function(d){ tooltip.style("display", "none");});

// Bars voor Thriller worden hier gemaakt  
year.selectAll(".meisjes")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "meisjes")
.style("fill","#FF69B4")
  .attr("x", d => xScale1("meisjes"))
  .attr("y", d => yScale(d.meisjes))
  .attr("width", xScale1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.meisjes)
  })
  .on("mouseover", function(d) {
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html("Meisjes" + "<br>" + (d.meisjes) + "%"); })
    .on("mouseout", function(d){ tooltip.style("display", "none");});

// x ass wordt hier aangemaakt
svg.append("g")
   .attr("class", "x axis")
   .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
   .call(xAxis)

// Label voor de x as
// BRON https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
 svg.append("text")             
    .attr("transform", "translate(" + (width/2) + " ," + (height - 40) + ")")
    .style("text-anchor", "middle")
    .text("Jaar")
// EINDE BRON https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e

// y ass wordt hier aangemaakt
svg.append("g")
   .attr("class", "y axis")
   .call(yAxis)

// Label voor de y ass
// BRON https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Procenten")   
// EINDE BRON https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e

var color = d3.scaleOrdinal()
    .range(["#0000FF", "#FF69B4"])

var legend = svg.selectAll(".legend")
    .data(options.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(-1200," + i * 20 + ")"; });

legend.append("rect")
    .attr("x", width + 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .attr("x", width + 40)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d) { return d; });