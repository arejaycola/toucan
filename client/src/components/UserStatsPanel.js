import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLocationArrow, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import numeral from 'numeral';

import { TweetContext } from '../contexts/TweetContext';
import TweetStatsContainer from './TweetStatsContainer';
import { Row, Image, Col, Container } from 'react-bootstrap';

const UserStatsPanel = (props) => {
	const { tweets, quotedTweets, retweets } = useContext(TweetContext);

	useEffect(() => {
		/* Move the window to the top so scroll position isn't preserved */
		window.scrollTo(0, 0);
	}, []);
	return (
		<Container fluid="lg" className="mt-5 px-0 py-5 p-lg-5 rounded bg-light semi-transparent">
			<Row className="mx-auto">
				<Col className="mx-auto text-center" md="4">
					{props.user.profile_image_url_https ? (
						<Image fluid className=" circle-picture" width="200px" src={`${props.user.profile_image_url_https.replace('_normal', '')}`} />
					) : null}
				</Col>
				<Col className="mx-auto px-md-0  mt-4 mt-md-0" xs="7" sm="5" md="4">
					<Row>
						<Col className="mx-auto">
							<Row>
								<Col xs={12}>
									<h3 className="mb-0">
										{props.user.name} <img style={{ height: '20px' }} src="/verified.png" />
									</h3>
								</Col>
							</Row>
							<Row className="mt-2">
								<Col>{props.user.description}</Col>
							</Row>
							<Row className="mt-2">
								<Col>
									<a target="_blank" href={`https://www.twitter.com/${props.user.screen_name}`}>
										<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faTwitter} /> @{props.user.screen_name}
									</a>
								</Col>
							</Row>
							<Row className="mt-2">
								<Col>
									<strong style={{ marginRight: '5px' }}>
										{props.user.friends_count < 10000
											? numeral(props.user.friends_count).format('0a')
											: numeral(props.user.friends_count).format('0.00a')}
									</strong>
									Following
									<span className="mx-3">
										<strong>|</strong>
									</span>
									<strong style={{ marginRight: '5px' }}>
										{props.user.followers_count < 10000
											? numeral(props.user.followers_count).format('0a')
											: numeral(props.user.followers_count).format('0.00a')}
									</strong>
									Followers
								</Col>
							</Row>
							<Row className="mt-2">
								<Col>
									<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCalendar} />
									Joined {moment(props.user.created_at).format('MMMM YYYY')}
								</Col>
							</Row>

							<Row className="mt-2">
								<Col>
									<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faLocationArrow} />
									{props.user.location ? props.user.location : 'No Location Provided'}
								</Col>
							</Row>

							<Row className="mt-2">
								<Col>
									<a target="_blank" href={props.user.url}>
										<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faLink} />
										{props.user.url ? props.user.url : 'No Website Provided'}
									</a>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col className="mx-auto px-md-0  mt-4 mt-md-0" xs="7" sm="5" md="4">
					<Row>
						<Col className="text-center">
							<TweetStatsContainer user={props.user} />
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default UserStatsPanel;
