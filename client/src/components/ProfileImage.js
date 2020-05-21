import React from 'react';

const ProfileImage = (props) => {
    const imageURL = props.image || '';
	return <img alt="Profile Image" src={imageURL.replace('_normal', '')} />;
};

export default ProfileImage;
