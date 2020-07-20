import React, { createContext, useState } from 'react';

export const UserTypeFilterContext = createContext();

const UserTypeFilterContextProvider = (props) => {
	const [showBothUserTypes, setShowBothUserTypes] = useState(true);
	const [showVerifiedUsers, setShowVerifiedUsers] = useState(true);
	const [showUnverifiedUsers, setShowUnverifiedUsers] = useState(true);

	return (
		<UserTypeFilterContext.Provider
			value={{ showBothUserTypes, setShowBothUserTypes, showVerifiedUsers, setShowVerifiedUsers, showUnverifiedUsers, setShowUnverifiedUsers }}
		>
			{props.children}
		</UserTypeFilterContext.Provider>
	);
};

export default UserTypeFilterContextProvider;
