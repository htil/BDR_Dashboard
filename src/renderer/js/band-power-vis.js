import * as d3 from "d3";

export const BandPowerVis = class {
  constructor() {
    // Set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 };
    this.width = window.innerWidth * 0.4 - margin.left - margin.right;
    this.height = window.innerHeight * 0.4 - margin.top - margin.bottom;

    // Default cut-off value
    this.cutOffValue = 19;

    // Initialize with only Beta wave data
    this.init_data = [{ group: "Beta", value: 1 }];

    // Create SVG container
    this.svg = d3
      .select("#bands")
      .append("svg")
      .attr("width", this.width + margin.left + margin.right)
      .attr("height", this.height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    this.x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(
        this.init_data.map(function (d) {
          return d.group;
        })
      )
      .padding(0.2);

    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

    // Add Y axis
    this.y = d3.scaleLinear().domain([0, 100]).range([this.height, 0]);
    this.svg.append("g").attr("class", "myYaxis").call(d3.axisLeft(this.y));

    // Add cut-off line
    this.cutOffLine = this.svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", this.y(this.cutOffValue))
      .attr("x2", this.width)
      .attr("y2", this.y(this.cutOffValue))
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    // Add cut-off label
    this.cutOffLabel = this.svg
      .append("text")
      .attr("x", this.width)
      .attr("y", this.y(this.cutOffValue) - 5)
      .attr("text-anchor", "end")
      .attr("fill", "red")
      .text("Cut-off: " + this.cutOffValue);

    // Create dropdown for cut-off selection
    this.createCutOffDropdown();
  }

  createCutOffDropdown() {
    // Create container for dropdown
    const dropdownContainer = d3
      .select("#bands")
      .insert("div", "svg")
      .style("margin-bottom", "10px");

    // Add label
    dropdownContainer
      .append("label")
      .attr("for", "cutOffSelect")
      .text("Select Cut-off Value: ")
      .style("margin-right", "10px");

    // Add dropdown with options
    const dropdown = dropdownContainer
      .append("select")
      .attr("id", "cutOffSelect")
      .style("padding", "5px");

    // Add options from 10 to 90 in steps of 10
    const options = [10, 13, 16, 19, 22, 25, 28, 31, 34];

    dropdown
      .selectAll("option")
      .data(options)
      .enter()
      .append("option")
      .attr("value", (d) => d)
      .text((d) => d)
      .property("selected", (d) => d === this.cutOffValue);

    // Add event listener
    const self = this;
    dropdown.on("change", function () {
      self.cutOffValue = parseInt(this.value);
      self.updateCutOffLine();
    });
  }

  updateCutOffLine() {
    // Update cut-off line position
    this.cutOffLine
      .transition()
      .duration(300)
      .attr("y1", this.y(this.cutOffValue))
      .attr("y2", this.y(this.cutOffValue));

    // Update cut-off label
    this.cutOffLabel
      .transition()
      .duration(300)
      .attr("y", this.y(this.cutOffValue) - 5)
      .text("Cut-off: " + this.cutOffValue);
  }

  update(data) {
    // Format to only include Beta wave
    let formatted_data = [{ group: "Beta", value: data.beta }];

    // Reference to the class variables
    let x = this.x;
    let y = this.y;
    let height = this.height;
    let cutOffValue = this.cutOffValue;

    // Update bars
    var u = this.svg.selectAll("rect").data(formatted_data);

    // Enter + update
    u.enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(10)
      .attr("x", function (d) {
        return x(d.group);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .attr("fill", function (d) {
        // Change color to red if value exceeds cut-off
        return d.value >= cutOffValue ? "#ff4d4d" : "#69b3a2";
      });

    // Remove extra bars if there are any
    u.exit().remove();

    // Add warning indicator if value exceeds cut-off
    var warningText = this.svg
      .selectAll(".warning-text")
      .data(formatted_data.filter((d) => d.value >= cutOffValue));

    warningText
      .enter()
      .append("text")
      .attr("class", "warning-text")
      .merge(warningText)
      .attr("x", (d) => x(d.group) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "Red")
      .text("Great Job");

    warningText.exit().remove();
  }

  format_data(data) {
    // Only returning Beta wave data
    return [{ group: "Beta", value: data.beta }];
  }
};