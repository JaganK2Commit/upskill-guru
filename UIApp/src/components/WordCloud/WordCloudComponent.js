import React from "react";
import * as d3 from "d3";
import * as cloud from "d3-cloud";

class WordCloudComponent extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const allSkills = this.props.data;
    console.log("allSkills", allSkills[0]);
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 800 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var svg_word_cloud = d3
      .select(`#${this.props.id}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var wordColor = d3
      .scaleOrdinal()
      .domain(allSkills)
      .range([
        "#f7cc57",
        "#3de380",
        "#966cab",
        "#f58eab",
        "#41457a",
        "#91b0d9",
        "#bab97b",
        "#9ec765",
        "#7dc7c6",
        "#ed645c",
        "#c9b6b3",
        "#067344",
        "#f77b0f",
        "#ba02f7",
        "#5869fc",
        "#466373",
        "#838485",
        "#7a5e49",
      ]);

    // new cloud layout to identify word's coordinates
    var layout = cloud()
      .size([width, height])
      .words(
        allSkills.map(function (d) {
          return { text: d.skill, frequency: d.frequency };
        })
      )
      .font("Impact")
      .rotate(function () {
        return 0;
      })
      .padding(6)
      .fontSize(function (d) {
        return d.frequency;
      })
      .on("end", draw);
    layout.start();

    // draw the words
    function draw(words) {
      svg_word_cloud
        .append("g")
        .attr(
          "transform",
          "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
          return d.frequency;
        })
        .style("fill", function (d, i) {
          return wordColor(i);
        })
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")";
        })
        .text(function (d) {
          return d.text;
        });
    }
  }

  render() {
    return <div style={this.props.style} id={this.props.id}></div>;
  }
}

export default WordCloudComponent;
