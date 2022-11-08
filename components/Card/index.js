import React from 'react'
import {ReactSVG} from 'react-svg'
import Router from 'next/router'
import './main.scss'

export default ({src,title,content,buttonText,buttonToAction})=>{

  return (
    <section className="card-wrapper">
      <div className="card">
        <h2 className="header-font card-title">{title}</h2>
        <ReactSVG className="card-svg" src={src}/>
        <p className="regular-font">{content}</p>
        <button
          onClick={()=>{
            if(buttonToAction.indexOf('.')!==0&&buttonToAction.indexOf('#')!==0){
               Router.push('/login-signup')
              return
            }
            window.scroll(
                {
                  top:document.querySelector(`${buttonToAction}`).offsetTop - 100,
                  left:0,
                  behavior: 'smooth'}
                )

          }}
          className="ripple card-call-to-act-btn regular-font">
          {buttonText}
        </button>
      </div>
    </section>
  )
}
