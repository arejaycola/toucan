import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default (props) => {
	const svgHeight = 275;
	const svgWidth = 450;

	const d3Chart = useRef(null);
	useEffect(() => {
		if (props.data && d3Chart.current) {
			const margin = {
				top: 10,
				right: 25,
				bottom: 65,
				left: 55,
			};

			const width = svgWidth - margin.left - margin.right;
			const height = svgHeight - margin.top - margin.bottom;

			d3.select(d3Chart.current).selectAll('g').remove();

			const svg = d3
				.select(d3Chart.current)
				.attr('viewbox', `0 0 ${svgHeight} ${svgWidth}`)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			/* Calculate the xScaleMax. This shouldn't need to happen because it should always be the same but just in case. */
			let xScaleMax = -1;
			props.data.forEach((category) => {
				const localMax = category.datum.length - 1;
				if (localMax > xScaleMax) {
					xScaleMax = localMax;
				}
			});

			const xScale = d3.scaleLinear().domain([0, xScaleMax]).nice().range([0, width]);

			/* Calculate the max of all the data elements passed. */
			let yScaleMax = -1;
			props.data.forEach((category) => {
				const localMax = d3.max(category.datum);

				if (localMax > yScaleMax) {
					yScaleMax = localMax;
				}
			});

			const yScale = d3.scaleLinear().domain([0, yScaleMax]).nice().range([height, 0]);

			const xAxis = d3.axisBottom(xScale).ticks(xScale.domain()[1]).tickFormat(props.tickFormat);

			const yAxis = d3
				.axisLeft(yScale)
				.ticks(yScale.domain()[1] > 10 ? 10 : yScale.domain()[1])
				.tickFormat(d3.format('d'));

			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis)
				.selectAll('text')
				.style('text-anchor', 'end')
				.attr('dx', '-.8em')
				.attr('dy', '.15em')
				.attr('transform', function (d) {
					return 'rotate(-65)';
				});
			svg.append('g').attr('class', 'y axis').call(yAxis);

			let line = d3
				.line()
				.x(function (d, i) {
					return xScale(i);
				})
				.y(function (d) {
					return yScale(d);
				})
				.curve(d3.curveMonotoneX);

			/* Plot all of the data sent to this component */
			for (let i = 0; i < props.data.length; i++) {
				if (props.data[i].show) {
					svg.append('path').datum(props.data[i].datum).classed('line', true).classed(`line-${props.data[i].type}`, true).attr('d', line);
				}
			}

			svg.append('text')
				.attr('text-anchor', 'middle')
				.attr('transform', 'rotate(-90)')
				.attr('y', -margin.left + 25)
				.attr('x', -height / 2)
				.style('font-size', '.9rem')
				.style('fill', '#555')
				.text(props.label);
		}
	}, [props.data, d3Chart.current]);

	return <svg className={props.id} width={svgWidth} height={svgHeight} ref={d3Chart} />;
};
