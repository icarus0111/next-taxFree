import React from 'react'
import Campsite from '../svg_wrapper/Campsite'
import './main.scss'

export default () => (
  <footer className='footer regular-font'>
    <div className="footer-content-container">
      <p>(888)-441-5741</p>
      <a
        title="Send an Email to our Customer Service Agents"
        className="regular-font footer-email-link"
        href ="mailto:info@taxfreerv.com">
        Email Us
      </a>
      <p>9 S. Broadway Avenue, Suite F, Red Lodge, MT, 59068</p>
      <small>&copy; Copyright {new Date().getFullYear()} TaxFree RV LLC</small>
    </div>
    <div className="footer-content-container">
    </div>
    <div className="footer-content-container">
    </div>
    <div className="footer-empty-space">
    </div>
    <Campsite/>
  </footer>
);
