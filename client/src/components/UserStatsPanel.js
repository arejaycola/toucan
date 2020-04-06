import React from 'react';

const UserStatsPanel = (props) => {
	return (
		<div>
			<h3>
				{props.user.name} <img style={{ height: '20px' }} src="/verified.png" />
			</h3>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
		</div>
	);
};

export default UserStatsPanel;
