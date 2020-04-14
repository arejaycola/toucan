import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

export default (props) => {
	const svgHeight = 300;
	const svgWidth = 600;

	const d3RetweetChartDay = useRef(null);
	useEffect(() => {
		if (props.dataVerified && props.dataUnverified && d3RetweetChartDay.current) {
			console.log(props.dataVerified);
			const margin = { top: 50, right: 50, bottom: 50, left: 50 };
			const width = svgWidth - margin.left - margin.right;
			const height = svgHeight - margin.top - margin.bottom;

			d3.select(d3RetweetChartDay.current)
				.selectAll('g')
				.remove();

			const svg = d3
				.select(d3RetweetChartDay.current)
				.attr('viewbox', `0 0 ${svgHeight} ${svgWidth}`)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			const xScale = d3
				.scaleLinear()
				.domain([0, d3.max([props.dataUnverified.length - 1, props.dataVerified.length - 1])])
				.range([0, width]);
			// console.log(d3.max([props.dataUnverified.length, props.dataVerified.length]));
			const yScale = d3
				.scaleLinear()
				.domain([0, d3.max([d3.max(props.dataUnverified), d3.max(props.dataVerified)])])
				.range([height, 0]);

			const xAxis = d3
				.axisBottom(xScale)
				.ticks(xScale.domain()[1])
				.tickFormat(props.tickFormat);

			const yAxis = d3.axisLeft(yScale).ticks(yScale.domain()[1]);

			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis);

			svg.append('g')
				.attr('class', 'y axis')
				.call(yAxis);

			let line = d3
				.line()
				.x(function(d, i) {
					return xScale(i);
				})
				.y(function(d) {
					return yScale(d);
				})
				.curve(d3.curveMonotoneX);

			svg.append('path')
				.datum(props.dataUnverified)
				.classed('line', true)
				.classed('line-unverified', true)
				.attr('d', line);

			svg.append('path')
				.datum(props.dataVerified)
				.classed('line', true)
				.classed('line-verified', true)
				.attr('d', line);
		}
	}, [props.dataVerified, props.dataUnverified, d3RetweetChartDay.current]);

	return <svg className={props.id} width={svgWidth} height={svgHeight} ref={d3RetweetChartDay} />;
};
