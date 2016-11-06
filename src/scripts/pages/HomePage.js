import React from 'react'

import Page from './Page'
import IOweWidgetContainer from '../containers/IOweWidgetContainer'

function HomePage () {
  return (
    <Page title='Home'>
      <h1 className='homepage-logo'>
        <img className='homepage-logo-img' src={`${process.env.ASSETS}/images/iowho-logo.svg`} alt='IOWho Logo' />
        <span className='homepage-logo-text'>The blissfully simple money lending tracker</span>
      </h1>
      <IOweWidgetContainer />
    </Page>
  )
}

export default HomePage
