import React, { useRef, useEffect, useState } from 'react';
import { select, scaleLinear, axisBottom, axisLeft, scaleBand } from 'd3';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  return null;
};

const BarChart = ({ data }) => {
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    const TotalHeight = svgRef.current.clientHeight;
    const TotalWidth = svgRef.current.clientWidth;

    const xScale = scaleBand()
      .domain(data.map((val, i) => i))
      .range([0, TotalWidth])
      .padding(0.5);
    const yScale = scaleLinear()
      .domain([0, Math.max(...data) + 5])
      .range([TotalHeight, 0]);
    const colorScale = scaleLinear()
      .domain([45, 60, Math.max(...data) + 5])
      .range(['green', 'orange', 'red'])
      .clamp(true);
    const xAxis = axisBottom(xScale);
    svg
      .select('.xAxis')
      .style('transform', `translateY(${TotalHeight}px)`)
      .call(xAxis);
    const yAxis = axisLeft(yScale);
    svg.select('.yAxis').call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1,-1)')
      .attr('width', xScale.bandwidth())
      .attr('x', (val, i) => xScale(i))
      .attr('y', -TotalHeight)
      .on('mouseenter', (value, index) => {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join((enter) => enter.append('text').attr('y', yScale(value) - 2))
          .attr('class', 'tooltip')
          .text(value)
          .attr('x', xScale(index) + xScale.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .transition()
          .attr('y', yScale(value) - 5)
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.selectAll('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', (val) => TotalHeight - yScale(val));
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}>
        <g className='xAxis' />
        <g className='yAxis' />
      </svg>
    </div>
  );
};

export default BarChart;
