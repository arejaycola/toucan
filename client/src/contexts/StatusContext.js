import React, { createContext, useState } from 'react';

export const StatusContext = createContext();

const StatusContextProvider = (props) => {
	const [maxStatusCount, setMaxStatusCount] = useState(-1);

	return (
		<StatusContext.Provider
			value={{
				maxStatusCount,
				setMaxStatusCount,
			}}
		>
			{props.children}
		</StatusContext.Provider>
	);
};

export default StatusContextProvider;
