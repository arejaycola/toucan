import React, { createContext, useState } from 'react';

export const MaxStatusesContext = createContext();

const MaxStatusesContextProvider = (props) => {
	const [maxStatusCount, setMaxStatusCount] = useState(1);

	return (
		<MaxStatusesContext.Provider
			value={{
				maxStatusCount,
				setMaxStatusCount,
			}}
		>
			{props.children}
		</MaxStatusesContext.Provider>
	);
};

export default MaxStatusesContextProvider;
