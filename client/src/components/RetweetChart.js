import React from 'react';
import D3RetweetChartDay from './D3RetweetChart-Day';

const RetweetChart = (props) => {
	return (
		<div style={{ textAlign: "center" }}>
			<p>Retweet Chart</p>
			<D3RetweetChartDay data={props.retweets} />
		</div>
	);
};

export default RetweetChart;
