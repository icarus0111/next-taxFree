import React, {Component} from 'react'
import CheckBox from 'react-animated-checkbox';
import passwordValidator from 'password-validator'
import Link from 'next/link';
import Router from 'next/router'
import {connect} from 'react-redux'
import {loginUser} from '../actions/user'
import './main.scss'

class SignupLogin extends Component{
  constructor(props){
    super(props)
    this.state={
      signup:true,
      email:'',
      password:'',
      password2:'',
      error:''
    }
  }

  componentDidMount(){
    const urlParams = new URLSearchParams(window.location.search);
    const setting = urlParams.get('setting');
    if(setting==='login'){
      this.setState({signup:false})
    }
  }

  handleInput(e,input){
    this.setState({[input]:e.target.value})
  }

  isNotValidSubmit(){
    const { password, password2, email,signup } = this.state;
    const emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!password || !email || (signup&&!password2)) {
      this.handleErrorMessage('Provide input for all the fields');
      return true
    }

    if (signup&&password.length < 6) {
      this.handleErrorMessage('Password must be at least 7 characters');
      return true
    }

    if (signup&&password.length > 30) {
      this.handleErrorMessage('Password must be less than 30 characters');
      return true
    }

    if (!emailCheck.test(email)) {
      this.handleErrorMessage('Must be a valid email address');
      return true
    }

    if(signup&&password!==password2 ){
      this.handleErrorMessage('Passwords do not match');
      return true
    }
    if(signup){
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
      return true
    }
  }
    return false
  }

  handleErrorMessage(error){
    this.setState({error})
    setTimeout(()=>{this.setState({error:''})},7000)
  }

  handleSubmit = () => {
    const {signup,email,password} = this.state
    if(this.isNotValidSubmit())return
    const endpoint = signup? 'signup':'login'

    fetch(`/api/v1/account/${endpoint}`,{
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password })
    })
    .then(res => res.json())
    .then(this.handleResponse)
    .catch(err=>{this.handleErrorMessage('Unknown Server Error')})
  }

  handleResponse =(res) => {
    if(!res||res.message!=='Success'){
      this.handleErrorMessage(res.message)
      return
    }
    this.props.dispatch(loginUser(res.user))
    Router.push('/account')

  }

  render(){
    const {signup,error} = this.state
    return(
      <main className="signup-login-page regular-font">
        <h6 className="signup-login-title">{signup? "Sign Up": 'Login'}</h6>
        <section className="signup-login-section">
          <form
            className="signup-login-form"
            onSubmit={(e)=>e.preventDefault()}>
            <div className="signup-login-input-field-container">
              <p className='signup-login-input-title'>Email Address</p>
              <input
                className='signup-login-input-field regular-font'
                onChange={(e)=>{this.handleInput(e,'email')}}
              />
            </div>
            <div className="signup-login-input-field-container">
              <p className='signup-login-input-title'>Password</p>
              <input
                className='signup-login-input-field regular-font'
                type="password"
                onChange={(e)=>{this.handleInput(e,'password')}}
              />
            </div>
            {!signup? null:(
              <div className="signup-login-input-field-container">
                <p className='signup-login-input-title'>Repeat Password</p>
                <input
                  type="password"
                  className='signup-login-input-field regular-font'
                  onChange={(e)=>{this.handleInput(e,'password2')}}
                />
              </div>
            )}
          {error?(
            <pre
              onClick={()=>{this.setState({error:""})}}
              className='signup-login-error-message-container'>
              <p className='signup-login-error-message-content'>
                {error}
              </p>
            </pre>
          )
          :null}
          <div className="signup-login-bottom-portion">
            <button
              className="signup-login-submit-btn regular-font ripple"
              onClick={this.handleSubmit}>
              Submit
            </button>
            <div
              onClick={()=>{
                this.setState({signup:true})
              }}
              className="signup-login-radio-container">
            <CheckBox
                checked={signup}
                checkBoxStyle={{
                checkedColor: '#73C1B3',
                size: 20,
                unCheckedColor: '#b8b8b8'
            }}
                duration={150}
              />
              <label className="signup-login-label" htmlFor="signup">Signup</label>
            </div>
            <div
              onClick={()=>{
                this.setState({signup:false})
              }}
            className="signup-login-radio-container">
            <CheckBox
                checked={!signup}
                checkBoxStyle={{
                checkedColor: '#73C1B3',
                size: 20,
                unCheckedColor: '#b8b8b8'
            }}
                duration={150}
              />
              <label className="signup-login-label" htmlFor="login">Login</label>
            </div>
          </div>
          </form>
          <Link href="/forgot-password">
            <a className="signup-login-forgot-password-link">
              Forgot Password?
            </a>
          </Link>
        </section>
      </main>
    )
  }
}

export default connect(state => state)(SignupLogin);
