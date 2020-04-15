import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLocationArrow, faCalendar } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import numeral from 'numeral';

import { TweetContext } from '../contexts/TweetContext';
import TweetStatsContainer from './TweetStatsContainer';

const UserStatsPanel = (props) => {
	const { tweets, quotedTweets, retweets } = useContext(TweetContext);

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
			<p>{props.user.description} </p>
			<p style={{ textAlign: 'center' }}>
				<FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCalendar} />
				Joined {moment(props.user.created_at).format('MMMM YYYY')}
			</p>
			<div className="location-url-container">
				<div className="location-container">
					<FontAwesomeIcon style={{ marginRight: '3px' }} icon={faLocationArrow} />

					{props.user.location}
				</div>
				<div>
					<strong>|</strong>
				</div>
				<div className="url-container">
					<a target="_blank" href={props.user.url}>
						<FontAwesomeIcon style={{ marginRight: '3px' }} icon={faLink} />
						Website
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
			<TweetStatsContainer user={props.user} />
		</div>
	);
};

export default UserStatsPanel;
