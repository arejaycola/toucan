import React, { createContext, useState } from 'react';

export const RecommendationSettingsContext = createContext();

const RecommendationSettingsContextProvider = (props) => {
	const [selectedElement, setSelectedElement] = useState(null);
	const [autoFetch, setAutoFetch] = useState(false);
	const [sliderCount, setSliderCount] = useState(1000);

	return (
		<RecommendationSettingsContext.Provider
			value={{
				selectedElement,
				setSelectedElement,
				autoFetch,
				setAutoFetch,
				sliderCount,
				setSliderCount,
			}}
		>
			{props.children}
		</RecommendationSettingsContext.Provider>
	);
};

export default RecommendationSettingsContextProvider;
