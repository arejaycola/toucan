import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NotFoundPage from '../components/NotFoundPage';
import HomePage from '../components/HomePage';
import SearchResultsPage from '../components/SearchPage/Search/SearchResultsPage';
import UserPage from '../components/UserPage/UserPage';
import PublicRoute from './PublicRoute';
import SearchContextProvider from '../contexts/SearchContext';
import TweetContextProvider from '../contexts/TweetContext';
import LoadingContextProvider from '../contexts/LoadingContext';
import ChartContextProvider from '../contexts/ChartContext';
import UserTypeFilterContextProvider from '../contexts/UserTypeFilterContext';
import StatusFilterContextProvider from '../contexts/StatusFilterContext';
import RecommendationSettingsContextProvider from '../contexts/RecommendationSettingsContext';
import InitialStatusContextProvider from '../contexts/InitialStatusContext';
import StatusContextProvider from '../contexts/StatusContext';

export const history = createBrowserHistory();

const AppRouter = () => {
	return (
		<Router history={history}>
			<Switch>
				<SearchContextProvider>
					<PublicRoute path="/" component={HomePage} exact={true} />
					<TweetContextProvider>
						<LoadingContextProvider>
							<PublicRoute path="/search/:text" component={SearchResultsPage} exact={true} />
							<StatusContextProvider>
								<InitialStatusContextProvider>
									<PublicRoute path="/user/" component={UserPage} exact={true} />
									<ChartContextProvider>
										<UserTypeFilterContextProvider>
											<StatusFilterContextProvider>
												<RecommendationSettingsContextProvider>
													<PublicRoute path="/user/:id" component={UserPage} exact={true} />
												</RecommendationSettingsContextProvider>
											</StatusFilterContextProvider>
										</UserTypeFilterContextProvider>
									</ChartContextProvider>
								</InitialStatusContextProvider>
							</StatusContextProvider>
						</LoadingContextProvider>
					</TweetContextProvider>
				</SearchContextProvider>
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
};

export default AppRouter;
