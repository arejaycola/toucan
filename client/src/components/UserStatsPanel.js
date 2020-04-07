import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLocationArrow, faCalendar } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import numeral from 'numeral';

const UserStatsPanel = (props) => {
	return (
		<div>
			<h3>
				{props.user.name} <img style={{ height: '20px' }} src="/verified.png" />
			</h3>
			<p>
				<a target="_blank" href={`https://www.twitter.com/${props.user.screen_name}`}>
					@{props.user.screen_name}
				</a>
			</p>
			<p>{props.user.description}</p>
			<p>
				<FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCalendar} />
				Joined {moment(props.user.created_at).format('MMMM YYYY')}
			</p>
			<div className="location-url-container">
				<div className="location-container">
					<FontAwesomeIcon style={{ marginRight: '3px' }} icon={faLocationArrow} />
					{/* <img style={{ height: '15px' }} src="/location.png" /> */}
					{props.user.location}
				</div>
				<div className="url-container">
					<a target="_blank" href={props.user.url}>
						<FontAwesomeIcon style={{ marginRight: '3px' }} icon={faLink} />
						{props.user.url}
					</a>
				</div>
			</div>

			<div className="follow-container">
				<div className="following">
					<strong style={{ marginRight: '5px' }}>
						{props.user.friends_count < 10000
							? numeral(props.user.friends_count).format('0a')
							: numeral(props.user.friends_count).format('0.00a')}
					</strong>
					Following
				</div>
				<div>
					<strong>|</strong>
				</div>
				<div className="followers">
					<strong style={{ marginRight: '5px' }}>
						{props.user.followers_count < 10000
							? numeral(props.user.followers_count).format('0a')
							: numeral(props.user.followers_count).format('0.00a')}
					</strong>
					Followers
				</div>
			</div>
			<div className="tweet-stats-container">
				<h3>Tweets</h3>
				<hr />
				<div className="line-1">
					<div className="total-tweets-container">
						<p className="short-line">
							<strong>{numeral(props.user.statuses_count).format('0,0')}</strong>
						</p>
						<p>Total Tweets</p>
					</div>
					<div className="total-retweets-container">
						<p className="short-line">
							<strong>{numeral(props.user.statuses_count).format('0,0')}</strong>
						</p>
						<p>Total Retweets</p>
					</div>
				</div>
				<div className="line-2">
					<div className="total-tweets-container">
						<p className="short-line">
							<strong>{numeral(props.user.statuses_count).format('0,0')}</strong>
						</p>
						<p className="short-line">Tweets to Unverified Users</p>
						<p className="muted-small">(last 7 days)</p>
					</div>
					<div className="total-retweets-container">
						<p className="short-line">
							<strong>{numeral(props.user.statuses_count).format('0,0')}</strong>
						</p>
						<p className="short-line">Retweets to Unverified Users</p>
						<p className="muted-small">(last 7 days)</p>
					</div>
				</div>
			</div>
			<p>{props.user.name}</p>
			<p>{props.user.name}</p>
		</div>
	);
};

export default UserStatsPanel;
