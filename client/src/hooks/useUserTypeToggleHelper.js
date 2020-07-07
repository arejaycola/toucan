import { useEffect, useContext } from 'react';
import { UserTypeContext } from '../contexts/UserTypeContext';

const useUserTypeToggleHelper = () => {
	const { showBothUserTypes, setShowBothUserTypes, showVerifiedUsers, showUnverifiedUsers } = useContext(UserTypeContext);

	useEffect(() => {
		if (showUnverifiedUsers && showVerifiedUsers) {
			setShowBothUserTypes(true);
		} else {
			setShowBothUserTypes(false);
		}
	}, [showVerifiedUsers, showUnverifiedUsers, showBothUserTypes]);
};

export default useUserTypeToggleHelper;
