import React, { useContext, useState } from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NotFoundPage from '../components/NotFoundPage';
import HomePage from '../components/HomePage';
import SearchResultsPage from '../components/SearchResultsPage';
import UserPage from '../components/UserPage';
import PublicRoute from './PublicRoute';
import SearchContextProvider from '../contexts/SearchContext';
import TweetContextProvider from '../contexts/TweetContext';
import LoadingContextProvider from '../contexts/LoadingContext';

export const history = createBrowserHistory();

const AppRouter = () => {
	return (
		<Router history={history}>
			<div>
				<Switch>
					<SearchContextProvider>
						<PublicRoute path="/" component={HomePage} exact={true} />
						<PublicRoute path="/search/:text" component={SearchResultsPage} exact={true} />
						<TweetContextProvider>
							<PublicRoute path="/user/" component={UserPage} exact={true} />
							<LoadingContextProvider>
								<PublicRoute path="/user/:id" component={UserPage} exact={true} />
							</LoadingContextProvider>
						</TweetContextProvider>
					</SearchContextProvider>
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
