import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import  {Main}  from '../components/Main';
import {Welcome} from '../components/Welcome';
//NB: the name of this object you import must be the same as the object you export in eg ../components/SearchProperty
import { SearchProperty } from '../components/SearchProperty';
import {AvailProperties} from '../components/AvailProperties';

const router = (
	<Router history={browserHistory}>
		<Route path='/' component={Main}>
			<Route path = 'welcome' component = {Welcome} />
			<Route path = 'search' component = {SearchProperty} />
			<Route path = 'properties_available' component = {AvailProperties}/>
			<IndexRoute component={Welcome} />
		</Route>
	</Router>
);
//http://stackoverflow.com/questions/30871070/react-router-pass-props-on-routes-to-child-components
//http://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component

export { router };