import React from 'react';
import * as d3 from 'd3';
import * as bubbleStyle from './bubbleStyle.css';

class BubbleChart extends React.Component {
componentDidMount() {
this.drawChart();
}

drawChart() {
const markers = this.props.data;

var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select(`#${this.props.id}`).append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
      "translate(" + margin.left + "," + margin.top + ")");
      
var projection = d3.geoMercator().scale(800)                       
    .translate([ margin.left + width*2, margin.top + height*1.8])
    
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then((data)=>{
      data.features = data.features.filter( function(d){return d.properties.name=="USA"} )
      
      // colors for data points
      var color = d3.scaleOrdinal()
        .domain(["A", "B", "C" ])
        .range([ "#402D54", "#D18975", "#8FD175"])
  
      // scale for bubble size
      var size = d3.scaleLinear()
        .domain([1,100])  
        .range([ 4, 50])  
  
      
      // draw the map
      svg.append("g")
          .selectAll("path")
          .data(data.features)
          .enter()
          .append("path")
            .attr("fill", "#b8b8b8")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
          .style("stroke", "black")
          .style("opacity", .3)
      
      // tooltip
    
  
      // add circles
      svg
        .selectAll("myCircles")
        .data(markers)
        .enter()
        .append("circle")
          .attr("class" , function(d){ return d.group })
          .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
          .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
          .attr("r", function(d){ return size(d.size) })
          .style("fill", function(d){ return color(d.group) })
          .attr("stroke", function(d){ return color(d.group) })
          .attr("stroke-width", 3)
          .attr("fill-opacity", .4)
          // .on("mouseover", showTooltip )
          // .on("mousemove", moveTooltip )
          // .on("mouseleave", hideTooltip )


          function update(){
            // if you check box:
            d3.selectAll(".checkbox").each(function(d){
              var cb = d3.select(this);
              var grp = cb.property("value")
      
              // if checked, show data
              if(cb.property("checked")){
                svg.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.size) })
                
              // if not checked, hide it
              }else{
                svg.selectAll("."+grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
                
              }
            })
          }      

          d3.selectAll(".checkbox").on("change",update);

          update()
    }).catch(err=>{
      console.log(err)
    })

}

render(){
return  <div style={this.props.style} id={this.props.id}></div>
}

}

export default BubbleChart;