import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import  {Main}  from '../components/Main';
import {Welcome} from '../components/Welcome';
//NB: the name of this object you import must be the same as the object you export in eg ../components/SearchProperty
import { SearchProperty } from '../components/SearchProperty';

const router = (
	<Router history={browserHistory}>
		<Route path='/' component={Main}>
			<Route path = 'welcome' component = {Welcome} />
			<Route path = 'search' component = {SearchProperty} />
			<IndexRoute component={Welcome} />
		</Route>
	</Router>
);

export { router };