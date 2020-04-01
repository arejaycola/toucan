import React, { useContext, useState } from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NotFoundPage from '../components/NotFoundPage';
import HomePage from '../components/HomePage';
import SearchResultsPage from '../components/SearchResultsPage';
import PublicRoute from './PublicRoute';
import SearchContext from '../contexts/SearchContext';
import SearchContextProvider from '../contexts/SearchContext';

export const history = createBrowserHistory();

const AppRouter = () => {
	return (
		<Router history={history}>
			<div>
				<Switch>
					<SearchContextProvider>
						<PublicRoute path="/" component={HomePage} exact={true} />
						<PublicRoute path="/search-results" component={SearchResultsPage} exact={true} />
					</SearchContextProvider>
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
// import React, { useContext, useState } from 'react';
// import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import NotFoundPage from '../components/NotFoundPage';
// import HomePage from '../components/HomePage';
// import SearchResultsPage from '../components/SearchResultsPage';
// import PublicRoute from './PublicRoute';
// import SearchContext from '../context/search-context'

// export const history = createBrowserHistory();

// const AppRouter = () => {
// 	const [searchResults, setSearchResults] = useState();

// 	return (
// 		<Router history={history}>
// 			<div>
// 				<Switch>
// 					<SearchContext.Provider value={{ searchResults, setSearchResults }}>
// 						<PublicRoute path="/search-results" component={SearchResultsPage} exact={true} />
// 						<PublicRoute path="/" component={HomePage} exact={true} />
// 					</SearchContext.Provider>
// 					<Route component={NotFoundPage} />
// 				</Switch>
// 			</div>
// 		</Router>
// 	);
// };

// export default AppRouter;
