import React from 'react'
import Card from '../Card'
import Chart from '../Chart'
import CompactDetails from '../CompactDetails'
import Testimonial from '../Testimonial'
import GoldenGate from '../svg_wrapper/GoldenGate'
import DrivingScene from '../svg_wrapper/DrivingScene'
import Flag from '../svg_wrapper/Flag'
import Link from 'next/link';
import {useState} from 'react'
import {connect} from 'react-redux'
const { detect } = require('detect-browser');

import './main.scss'




const Home = (props) =>  {
  if (typeof window !== 'undefined') {
    const browser = detect();

    switch (browser && browser.name) {
    case 'chrome':
    case 'firefox':
      break;
    default:
      alert("The best browser experience without any issues so far has been with Chrome. Please use Chrome to avoid any issues and have the expected experience")
      // props.dispatch(notChrome())
  }
}


  return (
  <>
   <div className="regular-font home-page-banner" id="home-call-to-action-1">Would you like to speak with one of our Team Members? (888) 441-5741
   </div>
   <div className="regular-font home-page-banner"><h1>{`Save Thousands on your vehicle’s Sales Taxes and Annual Property Taxes through a Montana LLC`}</h1><a
          title="Better Business Bureau Rating for TaxFree RV"
          id='bbb-link'
          target="_blank"
          href='https://www.bbb.org/us/mt/red-lodge/profile/camper-dealers/tax-free-rv-llc-1296-64006791'
          className='regular-font'>
          BBB Rating A+

         </a>
    </div>
    <GoldenGate/>
     <section className="card-container section-1 section">
         <Card
           src="idea.svg"
           title="How it Works"
           content="By forming a Montana LLC, that LLC is considered a resident of Montana and can own and register vehicles. Volia, you can start saving money immediately on your initial and future registration fees!"
           buttonText="See How"
           buttonToAction=".accordion-list"
           />
         <Card
           src="cash.svg"
           title="Save Money"
           content="With our expert services, you can avoid most if not all of your states vehicle taxes. Let Tax Free RV save your money and stop states sales and property tax from weighing you down. For as little as $895, you can start saving thousands!"
           buttonText="Compare Price"
           buttonToAction="#expenses-chart"
           />
           <Card
             src="form.svg"
             title="Easy Online Registration"
             content="If you prefer to sign up on-line, we make it easy to do! Click below and get the process started today. It’s also your choice if you would prefer paying one of our customer service professionals."
             buttonText="Sign Up Now"
             buttonToAction="login-signup"
             />
           <Card
             src="law.svg"
             title="Legality"
             content="The Tax Free RV program is legal throughout the United States and all Countries outside of the USA. Understanding the legal requirements is an important part of your due diligence. Be sure to let us help you understand the use and ownership requirements of your particular resident state."
             buttonText="Understand How"
             buttonToAction="#legality"
             />
    </section>
    <p className='regular-font home-page-chart-description'>Potential Savings with Tax Free RV compared to registering in these states over five years</p>
    <section className="section-2 section">
     <Chart/>
    </section>
    <section className="section-3 section">
    <div className='content'>
      <div className='regular-font'>Established in 2005 ~ owned and managed by the founders with 1,000’s of happy customers.
      </div>
      <Flag/>
    </div>
    <DrivingScene/>
    </section>
    <div className="regular-font home-page-call-to-action" id="home-call-to-action-2">
        <p>Send us an inquiry?</p>
        <Link href="/contact">
          <a title="Contains email, phone, and quick message ability">
            Click Here
          </a>
        </Link>
    </div>
    <section className="section-4 section">
     <CompactDetails/>
    </section>
    <div className="regular-font home-page-call-to-action" id="home-call-to-action-3">
      <p>Need more information? Send us an e-mail!</p>
        <a
          title="Send an Email to our Customer Service Agents"
          className="regular-font home-page-call-to-action-link"
          href ="mailto:info@taxfreerv.com">
          Click here
        </a>
    </div>
    <section className="section-5 section">
     <Testimonial/>
    </section>
</>
 )
 }

 export default connect(state => state)(Home);
