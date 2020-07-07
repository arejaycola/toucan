import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NotFoundPage from '../components/NotFoundPage';
import HomePage from '../components/HomePage';
import SearchResultsPage from '../components/SearchResultsPage';
import UserPage from '../components/UserPage';
import PublicRoute from './PublicRoute';
import SearchContextProvider from '../contexts/SearchContext';
import TweetContextProvider from '../contexts/TweetContext';
import LoadingContextProvider from '../contexts/LoadingContext';
import ChartContextProvider from '../contexts/ChartContext';
import UserTypeContextProvider from '../contexts/UserTypeContext';
import StatusContextProvider from '../contexts/StatusContext';

export const history = createBrowserHistory();

const AppRouter = () => {
	return (
		<Router history={history}>
			<Switch>
				<SearchContextProvider>
					<PublicRoute path="/" component={HomePage} exact={true} />
					<PublicRoute path="/search/:text" component={SearchResultsPage} exact={true} />
					<TweetContextProvider>
						<PublicRoute path="/user/" component={UserPage} exact={true} />
						<LoadingContextProvider>
							<ChartContextProvider>
								<UserTypeContextProvider>
									<StatusContextProvider>
										<PublicRoute path="/user/:id" component={UserPage} exact={true} />
									</StatusContextProvider>
								</UserTypeContextProvider>
							</ChartContextProvider>
						</LoadingContextProvider>
					</TweetContextProvider>
				</SearchContextProvider>
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
};

export default AppRouter;
