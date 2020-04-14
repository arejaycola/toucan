import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

export default (props) => {
	const svgHeight = 300;
	const svgWidth = 600;

	let verifiedUsers = [];
	let unverifiedUsers = [];

	const d3RetweetChartDay = useRef(null);

	/* The useEffect Hook is for running side effects outside of React,
    for instance inserting elements into the DOM using D3 */
	useEffect(() => {
		if (props.data && d3RetweetChartDay.current) {
			/* Retweeted status->user->verified */
			const verifiedDay = Array(7).fill(0);
			const unverifiedDay = Array(7).fill(0);

			props.data.map((retweet) => {
				if (retweet.retweeted_status.user.verified) {
					let tempMoment = moment(new Date(retweet.created_at));

					/* Increment the corresponding count. */
					verifiedDay[tempMoment.weekday()]++;
					verifiedUsers.push(verifiedDay);
				} else {
					let tempMoment = moment(new Date(retweet.created_at));

					/* Increment the corresponding count. */
					unverifiedDay[tempMoment.weekday()]++;
					unverifiedUsers.push(unverifiedDay);
					unverifiedUsers.push(retweet);
				}
			});

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
				.domain([0, 6])
				.range([0, width]);

			const yScale = d3
				.scaleLinear()
				.domain([0, d3.max([d3.max(unverifiedDay), d3.max(verifiedDay)])])
				.range([height, 0]);

			const xAxis = d3.axisBottom(xScale).ticks(7).tickFormat((d) => {
				return moment().weekday(d).format('dddd')
			});

			const yAxis = d3.axisLeft(yScale).ticks(yScale.domain()[1])

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
					console.log(d);
					return xScale(i);
				})
				.y(function(d) {
					return yScale(d);
				})
				.curve(d3.curveMonotoneX);

			svg.append('path')
				.datum(unverifiedDay)
				.classed('line', true)
				.classed('line-unverified', true)
				.attr('d', line);

			svg.append('path')
				.datum(verifiedDay)
				.classed('line', true)
				.classed('line-verified', true)
				.attr('d', line);
		}
	}, [props.data, d3RetweetChartDay.current]);

	return <svg className="d3-retweet-chart-day" width={svgWidth} height={svgHeight} ref={d3RetweetChartDay} />;
};
