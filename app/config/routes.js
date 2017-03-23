import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Main } from '../components/Main';
import { SearchProperty } from '../components/SearchProperty';

const router = (
	<Router history={browserHistory}>
		<Route path='/' component={Main}>
			<Route path = 'search' component = {SearchProperty} />
			<IndexRoute component={Main} />
		</Route>
	</Router>
);

export { router };