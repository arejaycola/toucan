import React from 'react';

const BannerImage = (props) => {
	return (
		<div className="banner-image-container">
			<img alt='Profile Banner Image' src={props.image} />
		</div>
	);
};

export default BannerImage;
