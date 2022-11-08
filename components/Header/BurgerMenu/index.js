import React from 'react'
import Link from 'next/link'
import './main.scss'



 export default ({menuOpen,handleClick,isRedirectPage,user}) => {

   const displayMenu = (menuOpen,isRedirectPage)=>{
     const renderLink = (href,title,titleAttribute) =>{
       return isRedirectPage?
       <a href={href}>{title}</a>:
       (
         <Link href={href}>
           <a title={titleAttribute}>{title}</a>
         </Link>
       )
     }

     let isActive = menuOpen?'active-menu':'inactive-menu'
     return (
       <nav className={isActive + ' menu regular-font'}>
        <ul>
         <li>
           {renderLink('/','Home',"Tax Free RV Homepage")}
          </li>
         <li>
           {!user?renderLink('/login-signup','Sign Up - Login', 'Account signup and login page'):null}
          </li>
         <li>
           {user?renderLink('/account','Account Profile', 'Much of TaxFree Account Profile functionality found here'):null}
          </li>
         <li>
           {renderLink('/contact','Contact',"Contains email, phone, and quick message ability")}
          </li>
         <li>
           {renderLink('/faq','FAQ',"Frequently Asked Questions")}
          </li>
        </ul>
       </nav>
     )
   }

    return (
      <button
        onClick={()=>{handleClick()}}
        className={`hamburger hamburger--collapse ${menuOpen?'is-active':''}`} type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
        {displayMenu(menuOpen,isRedirectPage)}
      </button>
    );
}
