import React, { createContext, useState, useEffect } from 'react';

export const ChartContext = createContext();

const ChartContextProvider = (props) => {
	const [showTimeChart, setShowTimeChart] = useState(false);
	const [showDayTimeChart, setShowDayTimeChart] = useState(false);
	const [showTimeTodayChart, setShowTimeTodayChart] = useState(false);

	return (
		<ChartContext.Provider
			value={{
				showTimeChart,
				showDayTimeChart,
				showTimeTodayChart,
				setShowTimeChart,
				setShowDayTimeChart,
				setShowTimeTodayChart,
			}}
		>
			{props.children}
		</ChartContext.Provider>
	);
};

export default ChartContextProvider;
