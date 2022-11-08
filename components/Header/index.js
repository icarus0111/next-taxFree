import Link from 'next/link';
import Router from 'next/router';
import BurgerMenu from './BurgerMenu'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logoutUser} from '../actions/user'
import './main.scss'

class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      menuOpen:false,
    }
  }

  handleClick = () => {
    let isOpen =  !this.state.menuOpen
    if(isOpen){
      document.body.style.overflow ='hidden'
    }else{
      document.body.style.overflow ='visible'
    }
    this.setState({menuOpen:isOpen})
   }

   handleHeaderClick = () =>{
     if(this.state.menuOpen){
       this.setState({menuOpen:false})
       document.body.style.overflow ='visible'
     }
   }

   renderHomeLink = () => {
     return this.props.isRedirectPage?(
       <a className="header-home-link" href="/" title="Tax Free Rv Home Page">
          <h3 onClick={this.handleHeaderClick}>TaxFree RV</h3>
       </a>
          )
            : (
       <Link href="/">
          <a className="header-home-link"      onClick={this.handleHeaderClick}
           title="Tax Free Rv Home Page">
          <img src='logo.png' width='400' height='125'/>
         </a>
       </Link>
    )
   }


   renderSignupLogin = () => {
     return this.props.isRedirectPage?(
       <a href="/login-signup" title="Account Login and Registration">
         <button
           onClick={this.handleHeaderClick}
           className="ripple header-font register-btn ">Sign Up - Login</button>
       </a>
     ):(
       <Link href="/login-signup">
         <a title="Account Login and Registration">
           <button
             onClick={this.handleHeaderClick}
             className="ripple header-font register-btn ">Click here to sign up to create your Montana LLC</button>
         </a>
       </Link>
     )
   }

   handleLogout = () => {
     fetch('/api/v1/account/logout',{credentials:'include'})
     .catch(err=>console.log(err))
     Router.push('/login-signup?setting=login')
     this.props.dispatch(logoutUser())
   }

   renderLogout = () => {
     return this.props.isRedirectPage?(
       <a href="/" onClick={this.handleLogout} title="Tax Free Rv Home Page">
         <button
           onClick={this.handleHeaderClick}
           className="ripple header-font register-btn ">Logout</button>
       </a>
     ):(
       <Link href="/">
         <a onClick={this.handleLogout} title="Tax Free Rv Home Page">
           <button
             onClick={this.handleHeaderClick}
             className="ripple header-font register-btn ">Logout</button>
         </a>
       </Link>
     )
   }

  render(){
    return (
      <header className="main-header">
       <div className="main-header-content regular-font">
        <BurgerMenu
          user={this.props.user}
          isRedirectPage={this.props.isRedirectPage}
          menuOpen={this.state.menuOpen}
          handleClick={this.handleClick}/>
          {this.renderHomeLink()}
          {this.props.user?this.renderLogout():this.renderSignupLogin()}
        </div>
      </header>
    );
  }
}

export default connect(state => state)(Header);
