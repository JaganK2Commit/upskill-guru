import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import * as bubbleStyle from "./bubbleStyle.css";

class BubbleChart extends React.Component {
  drawChart() {
    console.log("BubbleChart draw", this.props.id);

    d3.select("#" + this.props.id)
      .select("svg")
      .remove();
    const markers = this.props.data;
    if (markers.length > 0) {
      this.state = {
        skillNameArray: [
          ...new Set(this.props.data.map((item) => item.skill_name)),
        ],
      };
      var margin = { top: 20, right: 20, bottom: 30, left: 100 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      this.svg = d3
        .select(`#${this.props.id}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var projection = d3
        .geoMercator()
        .scale(800)
        .translate([margin.left + width * 2, margin.top + height * 1.8]);

      d3.json(
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
      )
        .then((data) => {
          data.features = data.features.filter(function (d) {
            return d.properties.name == "USA";
          });

          // colors for data points

          var colors = d3
            .scaleOrdinal()
            .domain(this.state.skillNameArray)
            .range([
              "red",
              "steelblue",
              "green",
              "blue",
              "yellow",
              "pink",
              "lime",
              "orange",
              "black",
              "teal",
              "magenta",
              "maroon",
              "lavander",
              "coffee",
              "gray",
            ]);

          // scale for bubble size
          var size = d3
            .scaleLinear()
            .domain([
              1,
              d3.max(markers, function (d) {
                return d.frequency;
              }),
            ])
            .range([4, 50]);

          // draw the map
          this.svg
            .append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "#b8b8b8")
            .attr("d", d3.geoPath().projection(projection))
            .style("stroke", "black")
            .style("opacity", 0.3);

          // tooltip

          // add circles
          this.svg
            .selectAll("myCircles")
            .data(markers)
            .enter()
            .append("circle")
            .attr("class", function (d) {
              return d.skill_name;
            })
            .attr("cx", function (d) {
              return projection([d.longi, d.lat])[0];
            })
            .attr("cy", function (d) {
              return projection([d.longi, d.lat])[1];
            })
            .attr("r", function (d) {
              return size(d.frequency);
            })
            .style("fill", function (d) {
              return colors(d.skill_name);
            })
            .attr("stroke", function (d) {
              return colors(d.skill_name);
            })
            .attr("stroke-width", 3)
            .attr("fill-opacity", 0.4);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  updateChart = (skill_name) => {
    var size = d3.scaleLinear().domain([1, 100]).range([4, 50]);

    this.state.skillNameArray.forEach((skill) => {
      // if checked, show data

      if (skill.toLowerCase() == skill_name.toLowerCase()) {
        if (skill.toLowerCase() == "c++") {
          skill = `C\\+\\+`;
        }
        if (skill.toLowerCase() == "c#") {
          skill = `C\\#`;
        }
        if (skill.toLowerCase() == "react.js") {
          skill = `React\\.js`;
        }
        if (skill.toLowerCase() == "vb.net") {
          skill = `VB\\.NET`;
        }
        if (skill.toLowerCase() == ".net") {
          skill = `\\.NET`;
        }
        if (skill.toLowerCase() == "cpm-cpmhc") {
          skill = `CPM\\-CPMHC`;
        }
        if (skill.toLowerCase() == "node.js") {
          skill = `NODE\\.JS`;
        }
        if (skill.toLowerCase() == "tcp/ip") {
          skill = `TCP\\/IP`;
        }
        if (skill.toLowerCase() == "unix/linux") {
          skill = `UNIX\\/LINUX`;
        }
        this.svg
          .selectAll("." + skill)
          .transition()
          .duration(1000)
          .style("opacity", 1)
          .attr("r", function (d) {
            return size(d.frequency);
          });

        // if not checked, hide it
      } else {
        if (skill.toLowerCase() == "c++") {
          skill = `C\\+\\+`;
        }
        if (skill.toLowerCase() == "c#") {
          skill = `C\\#`;
        }
        if (skill.toLowerCase() == "react.js") {
          skill = `React\\.js`;
        }
        if (skill.toLowerCase() == "vb.net") {
          skill = `VB\\.NET`;
        }
        if (skill.toLowerCase() == ".net") {
          skill = `\\.NET`;
        }
        if (skill.toLowerCase() == "cpm-cpmhc") {
          skill = `CPM\\-CPMHC`;
        }
        if (skill.toLowerCase() == "node.js") {
          skill = `NODE\\.JS`;
        }
        if (skill.toLowerCase() == "tcp/ip") {
          skill = `TCP\\/IP`;
        }
        if (skill.toLowerCase() == "unix/linux") {
          skill = `UNIX\\/LINUX`;
        }
        // console.log("skill",skill)
        this.svg
          .selectAll("." + skill)
          .transition()
          .duration(1000)
          .style("opacity", 0)
          .attr("r", 0);
      }
    });
  };

  render() {
    return <div style={this.props.style} id={this.props.id}></div>;
  }
}

export default BubbleChart;
