import React, { Component } from 'react'
import './main.scss'

class ForgotPassword extends Component{
  constructor(props){
    super(props)
    this.state = {
      email:'',
      message:'',
      error:''
    }
    this.handleResponse = this.handleResponse.bind(this)
  }

  handleInput(input){
    this.setState({email:input})
  }

  handleSubmit =() => {
    const {email} = this.state
    const emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!email){
      this.handleErrorMessage('Please provide an email address');
      return
    }

    if (!emailCheck.test(email)) {
      this.handleErrorMessage('Must be a valid email address');
      return
    }

    fetch('/api/v1/account/forgot-password',{
      method:"post",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({email})
    })
    .then(res => res.json())
    .then(()=>{this.handleResponse()})
    .then(e   => this.handleErrorMessage('Unknown Server Error'))
  }

  handleResponse(){
    this.setState({message:'An email has been sent to the provided email address if it exist with the reset link. This will expire in 30 mins of this message.'})
  }

  handleErrorMessage(error){
    this.setState({error})
    setTimeout(()=>{this.setState({error:''})},3000)
  }

  render(){
    const {error,message} = this.state
    return(
        <section className="forgot-password-section regular-font">
          <h1 className="forgot-password-title regular-font">Forgot Password</h1>
          <form
            className="forgot-password-form"
            onClick={(e)=>e.preventDefault()}>
          <div className="forgot-password-input-container">
            <p className="forgot-password-input-title">Enter your Email Address to send the link to reset your password to</p>
            <input
              placeholder="email"
              className="forgot-password-input-field regular-font"
              onChange={e=>{this.handleInput(e.target.value)}}
              />
              </div>
            <button
              className="ripple forgot-password-submit-btn regular-font"
              onClick={this.handleSubmit}>
                Submit
            </button>
            {error?(
              <div
                onClick={()=>{this.setState({error:""})}}
                className='forgot-password-error-message-container'>
                <p className='forgot-password-error-message-content'>
                  {error}
                </p>
              </div>
            )
            :null}
            {message?(
              <div
                className='forgot-password-success-message-container'>
                <p className='forgot-password-success-message-content'>
                  {message}
                </p>
              </div>
            )
            :null}
          </form>
        </section>
    )
  }
}

export default ForgotPassword
