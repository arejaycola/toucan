import { useContext } from 'react';
import { StatusFilterContext } from '../contexts/StatusFilterContext';

const useToggleStatus = () => {
	const {
		showAllStatuses,
		setShowAllStatuses,
		showRetweets,
		setShowRetweets,
		showQuotedTweets,
		setShowQuotedTweets,
		showTweets,
		setShowTweets,
	} = useContext(StatusFilterContext);

	const toggleStatus = (e) => {
		if (e.target.id === 'show-all-status') {
			setShowAllStatuses(!showAllStatuses);
		} else if (e.target.id === 'show-tweets') {
			setShowTweets(!showTweets);
		} else if (e.target.id === 'show-retweets') {
			setShowRetweets(!showRetweets);
		} else if (e.target.id === 'show-quoted-tweets') {
			setShowQuotedTweets(!showQuotedTweets);
		}
	};

	return { toggleStatus };
};

export default useToggleStatus;
