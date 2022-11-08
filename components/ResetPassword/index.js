import React, { Component } from 'react'
import passwordValidator from 'password-validator'
import Router from 'next/router'
import './main.scss'

class ResetPassword extends Component{
  constructor(props){
    super(props)
    this.state = {
      password:'',
      password2:'',
      error:''
    }
  }

  handleInput(input,field){
    this.setState({[field]:input})
  }

  handleSubmit = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const {password,password2} = this.state
    if(password.length<6){
      this.handleErrorMessage('Password Must Be at least Seven Characters')
      return
    }

    if(!password||!password2){
      this.handleErrorMessage('Provide input for Both Passwords')
      return
    }

    if(password!==password2){
      this.handleErrorMessage('Passwords do not Match')
      return
    }

    const schema = new passwordValidator();
    schema
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    let validationError = schema.validate(password, { list: true })
    if(validationError.length){
      validationError= validationError.map((error)=>{
        switch(error){
          case 'uppercase':
           return "Password needs an uppercase letter"
          case 'lowercase':
            return "Password needs a lowercase letter"
          case 'digits':
            return 'Password needs a digit'
          case 'spaces':
            return 'Password cannot have a space in it'
          default:
            return ''
        }
      }).join('\n')
      this.handleErrorMessage(validationError);
      return
    }

    fetch('/api/v1/account/reset-password',{
      method:"post",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({password,token})
    })
    .then(res => res.json())
    .then(this.handleResponse)
    .catch(e  => this.handleErrorMessage('Unknown Server Error'))
  }



  handleResponse = (res) => {
    if(res.message!=='Success'){
      this.handleErrorMessage(res.message);
      return
    }
      this.setState({message:'Success!'})
      Router.push('/login-signup?setting=login')

  }

  handleErrorMessage = (error) => {
    this.setState({error})
    setTimeout(()=>{this.setState({error:''})},5000)
  }

  render(){
    let { error, success, message } = this.state
    return(
        <section className="reset-password-section regular-font">
          <h1 className="reset-password-title regular-font">Reset Password</h1>
          <form
            className="reset-password-form"
            onClick={(e)=>e.preventDefault()}>
          <div className="reset-password-input-container">
            <p className="reset-password-input-title">Enter your new Password</p>
            <input
              className="reset-password-input-field regular-font"
              type="password"
              onChange={e=>{this.handleInput(e.target.value,"password")}}
              />
          </div>
          <div className="reset-password-input-container">
            <p className="reset-password-input-title">Type your Password again</p>
            <input
              type="password"
              className="reset-password-input-field regular-font"
              onChange={e=>{this.handleInput(e.target.value,'password2')}}
              />
          </div>
            <button
              className="ripple reset-password-submit-btn regular-font"
              onClick={this.handleSubmit}>
                Submit
            </button>
            {message?(
              <div
                className='reset-password-success-message-container'>
                <p className='reset-password-success-message-content'>
                  {message}
                </p>
              </div>
            )
            :null}
            {error?(
              <div
                onClick={()=>{this.setState({error:""})}}
                className='reset-password-error-message-container'>
                <pre className='reset-password-error-message-content'>
                  {error}
                </pre>
              </div>
            )
            :null}
          </form>
        </section>
    )
  }
}

export default ResetPassword
