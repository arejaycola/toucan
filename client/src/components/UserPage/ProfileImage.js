import React from 'react';
import { Image, Col } from 'react-bootstrap';

const ProfileImage = (props) => {
	return (
		<Col className="mx-auto text-center" md="4">
			{props.user.profile_image_url_https ? (
				<Image fluid className=" circle-picture" width="200px" src={`${props.user.profile_image_url_https.replace('_normal', '')}`} />
			) : null}
		</Col>
	);
};

export default ProfileImage;
