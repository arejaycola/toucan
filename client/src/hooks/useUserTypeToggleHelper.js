import { useEffect, useContext } from 'react';
import { UserTypeFilterContext } from '../contexts/UserTypeFilterContext';

const useUserTypeToggleHelper = () => {
	const { showBothUserTypes, setShowBothUserTypes, showVerifiedUsers, showUnverifiedUsers } = useContext(UserTypeFilterContext);

	useEffect(() => {
		if (showUnverifiedUsers && showVerifiedUsers) {
			setShowBothUserTypes(true);
		} else {
			setShowBothUserTypes(false);
		}
	}, [showVerifiedUsers, showUnverifiedUsers, showBothUserTypes]);
};

export default useUserTypeToggleHelper;
