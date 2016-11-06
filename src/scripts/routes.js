/**
 * Routes
 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import HomePage from './pages/HomePage'
import AdvancedSearchPage from './pages/AdvancedSearchPage'
import ReportPage from './pages/ReportPage'
import AnalystPage from './pages/AnalystPage'
import EventsPage from './pages/EventsPage'
import EventPage from './pages/EventPage'
import TrendingPage from './pages/TrendingPage'
import WatchListenPage from './pages/WatchListenPage'
import StaticPage from './pages/StaticPage'
import FAQPage from './pages/FAQPage'
import ContactUsPage from './pages/ContactUsPage'
import TncsPage from './pages/TncsPage'
import DataProtectionPage from './pages/DataProtectionPage'
import AccessibilityPage from './pages/AccessibilityPage'
import TheTeamPage from './pages/TheTeamPage'

export default (
  <Route path='/' component={App} >
    <IndexRoute component={HomePage} />
    <Route path='advanced-search' component={AdvancedSearchPage} />
    <Route path='report/:id' component={ReportPage} />
    <Route path='watch-listen/:id' component={WatchListenPage} />
    <Route path='events' component={EventsPage} />
    <Route path='event/:id' component={EventPage} />
    <Route path='trending' component={TrendingPage} />
    <Route path='the-team' component={TheTeamPage} />
    <Route path='the-team/analyst/:id' component={AnalystPage} />
    <Route component={StaticPage} >
      <Route staticId='FAQ' pageTitle='FAQ' path='faq' component={FAQPage} />
      <Route staticId='ContactUs' pageTitle='Contact Us' path='contact-us' component={ContactUsPage} />
      <Route staticId='Tncs' pageTitle='Terms & Conditions' path='terms-and-conditions' component={TncsPage} />
      <Route staticId='DataProtection' pageTitle='Data Protection' path='data-protection' component={DataProtectionPage} />
      <Route staticId='Accessibility' pageTitle='Accessibility' path='accessibility' component={AccessibilityPage} />
    </Route>
  </Route>
)
