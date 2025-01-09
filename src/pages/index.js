import React from 'react'
import { Fragment } from 'react'
import Home from './home'
import Head from 'next/head'

const Alo = () => {
  return (
    <Fragment>
         <Head>
        <title>Empowering the Next Generation</title>
        <meta
          name="description"
          content="Join GenLab IB to explore and develop your skills in a collaborative environment."
        />
      </Head>
      <Home />
    </Fragment>
  )
}

export default Alo