import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLocationArrow, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import numeral from 'numeral';

const UserDetailsPanel = (props) => {
	return (
		<Col className="mx-auto px-md-0  mt-4 mt-md-0" xs="7" sm="5" md="4">
			<Row>
				<Col className="mx-auto">
					<Row>
						<Col xs={12}>
							<h3 className="mb-0">
								{props.user.name} <img alt="Verified Twitter Icon" style={{ height: '20px' }} src="/verified.png" />
							</h3>
						</Col>
					</Row>
					<Row className="mt-2">
						<Col>{props.user.description}</Col>
					</Row>
					<Row className="mt-2">
						<Col>
							<a target="_blank" rel="noopener noreferrer" href={`https://www.twitter.com/${props.user.screen_name}`}>
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
							<a target="_blank" rel="noopener noreferrer" href={props.user.url}>
								<FontAwesomeIcon style={{ marginRight: '10px' }} icon={faLink} />
								{props.user.url ? props.user.url : 'No Website Provided'}
							</a>
						</Col>
					</Row>
				</Col>
			</Row>
		</Col>
	);
};
export default UserDetailsPanel;
