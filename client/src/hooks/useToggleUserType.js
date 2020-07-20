import { useContext } from 'react';
import { UserTypeFilterContext } from '../contexts/UserTypeFilterContext';

const useToggleUserType = () => {
	const {
		showBothUserTypes,
		setShowBothUserTypes,
		showVerifiedUsers,
		setShowVerifiedUsers,
		showUnverifiedUsers,
		setShowUnverifiedUsers,
	} = useContext(UserTypeFilterContext);

	const toggleUserType = (e) => {
		if (e.target.id === 'show-both-users') {
			setShowVerifiedUsers(!showBothUserTypes);
			setShowUnverifiedUsers(!showBothUserTypes);
			setShowBothUserTypes(!showBothUserTypes);
		} else if (e.target.id === 'show-verified') {
			setShowVerifiedUsers(!showVerifiedUsers);
		} else if (e.target.id === 'show-unverified') {
			setShowUnverifiedUsers(!showUnverifiedUsers);
		}
	};

	return { toggleUserType };
};

export default useToggleUserType;
