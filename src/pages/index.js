import React from 'react'
import { Fragment } from 'react'
import Home from './home'
import Head from 'next/head'

const Alo = () => {
  return (
    <Fragment>
      <Head>
        <title>GenLab IB - Empowering the next generation through our dynamic cohort programs</title>
        <meta
          name="description"
          content="Join GenLab IB. Students Program. For aspiring innovators looking to explore and develop their skills in a collaborative environment."
        />
        <meta property="og:title" content="GenLab IB - Empowering the next generation through our dynamic cohort programs" />
        <meta property="og:description" content="Join GenLab IB. Students Program. For aspiring innovators looking to explore and develop their skills in a collaborative environment." />
        <meta property="og:url" content="https://www.genlabib.in" />
        <meta property="og:site_name" content="GenLab IB" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
      </Head>
      <Home />
    </Fragment>
  )
}

export default Alo

