import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import globalStyles from '../styles/globalStyles'
import './main.scss'

export default ({ children, isRedirectPage=false }) => (
  <>
    <Head>
      <meta name="twitter:card" content="Save on your RV expenses with a  Montana LLC Registration. Register online with TaxFree RV to start seeing savings on yearly costs on your Recreational Vehicle" />
      <meta name="twitter:site" content="http://taxfreervs.herokuapp.com" />
      <meta name="twitter:title" content="Tax Free RV can save you thousands on your Yearly Recreational Costs" />
      <meta name="twitter:description" content="Easy" />
      <meta name="twitter:image" content="https://farm6.staticflickr.com/5510/14338202952_93595258ff_z.jpg" />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <style type='text/css'>{globalStyles}</style>
      <script src="https://js.stripe.com/v3/" />
      <link href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre|Nanum+Gothic|Quicksand&display=swap" rel="stylesheet"/>
    </Head>
  <div className="page-wrapper">

    <Header isRedirectPage={isRedirectPage}/>
    <div id="top-page-spacing"></div>
      { children }
  </div>
  <Footer />
  </>
)
