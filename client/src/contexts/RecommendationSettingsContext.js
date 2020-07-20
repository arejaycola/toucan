import React, { createContext, useState } from 'react';

export const RecommendationSettingsContext = createContext();

const RecommendationSettingsContextProvider = (props) => {
	const [selectedElement, setSelectedElement] = useState(null);
	const [autoFetch, setAutoFetch] = useState(false);

	return (
		<RecommendationSettingsContext.Provider
			value={{
				selectedElement,
				setSelectedElement,
				autoFetch,
				setAutoFetch,
			}}
		>
			{props.children}
		</RecommendationSettingsContext.Provider>
	);
};

export default RecommendationSettingsContextProvider;
