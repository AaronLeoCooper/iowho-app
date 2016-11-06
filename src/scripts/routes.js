/**
 * Routes
 */

import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from './App'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import AboutPage from './pages/AboutPage'

export default (
  <Route path='/' component={App} >
    <IndexRoute component={HomePage} />
    <Route path='/list' component={ListPage} />
    <Route path='/about' component={AboutPage} />
    <Redirect from='/*' to='/' />
  </Route>
)
