import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

export default (props) => {
	let verifiedUsers = [];
	let unverifiedUsers = [];

	const d3RetweetChart = useRef(null);

	/* The useEffect Hook is for running side effects outside of React,
    for instance inserting elements into the DOM using D3 */
	useEffect(() => {
		if (props.data && d3RetweetChart.current) {
			/* Retweeted status->user->verified */
			let tempDay = [
				{
					day: 'Monday',
					count: 0
				},
				{
					day: 'Tuesday',
					count: 0
				},
				{
					day: 'Wednesday',
					count: 0
				},
				{
					day: 'Thursday',
					count: 0
				},
				{
					day: 'Friday',
					count: 0
				},
				{
					day: 'Saturday',
					count: 0
				},
				{
					day: 'Sunday',
					count: 0
				}
            ];
            
			// let tempHour = [
			// 	{
			// 		day: 0,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 1,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 2,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 3,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 4,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 5,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 6,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 7,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 8,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 9,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 10,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 11,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 12,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 13,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 14,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 15,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 16,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 17,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 18,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 19,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 20,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 21,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 22,
			// 		count: 0
			// 	},
			// 	{
			// 		day: 23,
			// 		count: 0
			// 	}
			// ];
			props.data.map((retweet) => {
				if (retweet.retweeted_status.user.verified) {
					let tempMoment = moment(new Date(retweet.created_at));

					/* Increment the corresponding count. */
					tempDay.filter((t) => {
						// console.log(t.day, tempMoment.format('dddd'));
						return t.day === tempMoment.format('dddd');
					})[0].count++;

					verifiedUsers.push(tempDay);
				} else {
					unverifiedUsers.push(retweet);
				}
			});

			const svg = d3.select(d3RetweetChart.current);

			console.log(verifiedUsers);
		}
	}, [props.data, d3RetweetChart.current]);

	return <svg className="d3-retweet-chart" width={400} height={200} ref={d3RetweetChart} />;
};
