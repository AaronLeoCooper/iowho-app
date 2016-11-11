/**
 * Routes
 */

import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from './App'

// Page Components
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import AboutPage from './pages/AboutPage'

// Route Paths
export const Index = '/'
export const List = '/list'
export const About = '/about'

// Router
export default (
  <Route path={Index} component={App} >
    <IndexRoute component={HomePage} />
    <Route path={List} component={ListPage} />
    <Route path={About} component={AboutPage} />
    <Redirect from='/*' to={Index} />
  </Route>
)
