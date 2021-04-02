import React from 'react';
import * as d3 from 'd3';
import * as barStyle from './barStyle.css';

class BarChart extends React.Component {
componentDidMount() {
this.drawChart();
}

drawChart() {
const data = this.props.data.sort(function (a, b) {
    return d3.ascending(a.freq, b.freq);
});

var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

var x = d3.scaleLinear()
      .range([0, width]);
      
var svg = d3.select(`#${this.props.id}`).append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
      "translate(" + margin.left + "," + margin.top + ")");

// format the data
data.forEach(function(d) {
d.freq = +d.freq;
});

// scale the range for data
x.domain([0, d3.max(data, function(d){ return d.freq; })])
y.domain(data.map(function(d) { return d.skills; }));


// rectangles for the bar chart
svg.selectAll(`#${this.props.id}`)
  .data(data)
.enter().append("rect")
  .attr("class", "barchart")
  .attr("width", 0)//this is the initial value
  .attr("height", y.bandwidth())
  .attr("y", function(d) { return y(d.skills); })
  .style("fill",  d3.color("steelblue"))
  .transition()
    .duration(1500)//time in ms
  .attr("width", function(d) {return x(d.freq); } );

// add the x Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(y));

//selection.attr(“property”, (d, i) => {})
}

render(){
return  <div id={this.props.id}></div>
}

}

export default BarChart;