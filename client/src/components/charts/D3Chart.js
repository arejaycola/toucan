import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default (props) => {
	const svgHeight = 275;
	const svgWidth = 450;

	const d3Chart = useRef(null);
	useEffect(() => {
		// console.log(props);
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

			const xScale = d3
				.scaleLinear()
				.domain([0, d3.max([props.dataUnverified.length - 1, props.dataVerified.length - 1])])
				.nice()
				.range([0, width]);

			let yScaleMax = -1;

			/* Calculate the max of all the data elements passed. */
			props.data.forEach((category) => {
				const localMax = d3.max(category.datum);

				if (localMax > yScaleMax) {
					yScaleMax = localMax;
				}
			});

			const yScale = d3
				.scaleLinear()
				.domain([0, yScaleMax])
				.nice()
				.range([height, 0]);

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

			svg.append('path').datum(props.dataUnverified).classed('line', true).classed('line-unverified', true).attr('d', line);

			svg.append('path').datum(props.dataVerified).classed('line', true).classed('line-verified', true).attr('d', line);

			svg.append('text')
				.attr('text-anchor', 'middle')
				.attr('transform', 'rotate(-90)')
				.attr('y', -margin.left + 25)
				.attr('x', -height / 2)
				.style('font-size', '.9rem')
				.style('fill', '#555')
				.text(props.label);
		}
	}, [props.dataVerified, props.dataUnverified, d3Chart.current]);

	return <svg className={props.id} width={svgWidth} height={svgHeight} ref={d3Chart} />;
};
