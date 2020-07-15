import React, { createContext, useState } from 'react';


export const RecommendationSettingsContext = createContext();

const RecommendationSettingsContextProvider = (props) => {
	const [selectedElement, setSelectedElement] = useState(null);


	return (
		<RecommendationSettingsContext.Provider
			value={{
				selectedElement,
				setSelectedElement,
			}}
		>
			{props.children}
		</RecommendationSettingsContext.Provider>
	);
};

export default RecommendationSettingsContextProvider;
