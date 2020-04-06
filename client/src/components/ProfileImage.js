import React, { useEffect } from 'react';

const ProfileImage = (props) => {
    const imageURL = props.image || '';
	return <img src={imageURL.replace('_normal', '')} />;
};

export default ProfileImage;
