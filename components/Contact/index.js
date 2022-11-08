import React, {Component} from 'react'
import {connect} from 'react-redux'
import Router from 'next/router'

import './main.scss'

class Contact extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      phone:'',
      message:'',
      error:'',
      successMessage:''
    }
  }

   handleSubmission(e){
    e.preventDefault()
    const {email, phone, message}  = this.state

    if(!email&&!phone){
      this.handleError('Please provide with at least a email or a phone number for us to reach you back with')
      return
    }

    if(email){
      const emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!emailCheck.test(email))return this.handleError('Please provide a valid email address to contact you with')
    }

    if(phone){
      const phoneCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(!phoneCheck.test(phone))return this.handleError('Please provide a valid phone # to contact you with')
    }

    if(!message){
      this.handleError('Please provide us with a message so we know how best to handle your query')
      return
    }

    this.setState({error:'',email:'',phone:'',message:''})

    const options  =   {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({email,phone,message})
      }

    fetch('/api/v1/email/customer-query',options)
    .then(res=>res.json())
    .then(res => this.handleResponse(res))
    .catch(err=>{this.handleNetworkError(err)})
  }

  handleNetworkError(err){
    console.log('Error sending email',err)
    this.handleError('Error sending email, please try again later')
  }

  handleResponse(res){
    if(res.message==='Success'){
      Router.push('/')

      this.setState({successMessage:"Successfully sent!"})

    }else{
      this.handleError(res.message)
    }
  }

  handleError(errorMessage){
    this.setState({error:errorMessage})
    setTimeout(()=>{
      this.setState({error:''})
    },8000)
  }

  handleChange(field,value){
    this.setState({[field]:value})
  }


  render(){
    return (
      <div className='contact-page'>
        <main>
          <section className="contact-list-container">
            <ul className='regular-font'>
              <li>
                <a href="mailto:sales@taxfreerv.com">info@taxfreerv.com</a>
              </li>
              <li>
                <a href="tel:+1-888-441-5741">1-888-441-5741</a>
              </li>
              <li>
                <h1>9 S. Broadway Ave., Suite F Red Lodge, MT 59068</h1>
              </li>
            </ul>
          </section>
          <section className='contact-form-container regular-font'>
           <h6>Leave us your email, or phone number, and a message and we will be happy to get back to you shortly!</h6>
            <form>
              <label htmlFor="contact-email">Email</label>
              <input
                className="contact-form-input regular-font"
                value={this.state.email}
                onChange={(e)=>{this.handleChange('email',e.target.value)}}
                id="contact-email"
                />

              <label htmlFor="contact-phone">Phone</label>
              <input
                id="contact-phone"
                className="contact-form-input regular-font"
                value={this.state.phone}
                onChange={(e)=>{this.handleChange('phone',e.target.value)}}
                />
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="contact-form-input regular-font"
                value={this.state.message}
                onChange={(e)=>{this.handleChange('message',e.target.value)}}
                />
                <button
                  onClick={(e)=>{this.handleSubmission(e)}}
                  className='regular-font ripple'>Submit</button>
                  {this.state.successMessage?<p className="contact-success-message">{this.state.successMessage}</p>:null}
                  {this.state.error?<p className="contact-error">{this.state.error}</p>:null}

            </form>
          </section>
        </main>
      </div>
  )
 }
}

export default connect(state => state)(Contact);
