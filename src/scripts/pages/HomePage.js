import React from 'react'
import Helmet from 'react-helmet'

import Page from './Page'

function HomePage () {
  return (
    <div>
      <Helmet title='Home' />
      <Page className='wrap'>

      </Page>
    </div>
  )
}

export default HomePage
