import React from 'react';

const BannerImage = (props) => {
	return (
		<div className="banner-image-container">
			<img src={props.image} />
		</div>
	);
};

export default BannerImage;
