import React, { createContext, useState } from 'react';

export const UserTypeContext = createContext();

const UserTypeContextProvider = (props) => {
	const [showBothUserTypes, setShowBothUserTypes] = useState(true);
	const [showVerifiedUsers, setShowVerifiedUsers] = useState(true);
    const [showUnverifiedUsers, setShowUnverifiedUsers] = useState(true);
    

	return (
		<UserTypeContext.Provider
			value={{ showBothUserTypes, setShowBothUserTypes, showVerifiedUsers, setShowVerifiedUsers, showUnverifiedUsers, setShowUnverifiedUsers }}
		>
			{props.children}
		</UserTypeContext.Provider>
	);
};

export default UserTypeContextProvider;
