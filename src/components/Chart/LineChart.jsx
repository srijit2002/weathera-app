import * as React from "react";
import { useRef, useEffect } from "react";
import * as d3 from "d3";


export const LineChart = ({ dataset = [], chartTitle }) => {
  const _parentRef = useRef(null);
  useEffect(() => {
    const parentRef = _parentRef.current;
    const margin = { top: 70, right: 30, bottom: 40, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Set up the x and y scales

    const x = d3.scaleTime().range([0, width]);

    const y = d3.scaleLinear().range([height, 0]);

    // Create the SVG element and append it to the chart container
    parentRef.innerHTML = "";
    const svg = d3
      .select(parentRef)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create a fake dataset

    // Define the x and y domains

    x.domain(d3.extent(dataset, (d) => d.date));
    y.domain([
      d3.min(dataset, (d) => d.value) - 1,
      d3.max(dataset, (d) => d.value) + 0.5,
    ]);

    // Add the x-axis

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d %b")));

    // Add the y-axis

    svg.append("g").call(d3.axisLeft(y));

    // Create the line generator

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    // Add the line path to the SVG element

    svg
      .append("path")
      .datum(dataset)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
    svg
      .append("text")
      .attr("x", width / 2) // Adjust the x-coordinate to center the title
      .attr("y", 0) // Adjust the y-coordinate for the desired position
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .text(chartTitle);
  }, [dataset, chartTitle]);

  return <div ref={_parentRef}></div>;
};
