import React from 'react'
import Link from 'next/link'
import data from './data'
import './main.scss'

const FaqMenu  = () =>{
  return (
    <div className='faq-menu-wrapper'>
      <div className='faq-menu-container regular-font'>
        <h6>FAQ Menu</h6>
        <ul className="faq-menu">
        {data.map((category,i)=>{
          return (
          <li
           key={i}
           className="faq-menu-item regular-font"
           onClick={()=>{
            window.scroll(
              {
                top:document.querySelector(`#faq-category-${i}`).offsetTop - 100,
                left:0,
                behavior: 'smooth'}
              )
            }}>
            <h3>
              {category.headline}
            </h3>
          </li>
        )
          })
        }
        </ul>
      </div>
    </div>
  )
}

const Content = ({question,answer,link}) => {
  return(
    <div className='faq-content regular-font'>
      <h1 className="faq-question">{question}</h1>

      { Array.isArray(answer)?
        answer.map((answer,i)=><li key={i}>{answer}</li>)
        :
      <p className="faq-answer">{answer}</p>
    }
    {
      link?(
        <Link href={link}>
        <a>see more details</a>
        </Link>
      )
      :null
    }
    </div>
 )
}

const Category = ({headline,content,id}) => {
  return (
    <section id={id} className='section faq-section regular-font'>
      <h3>{headline}</h3>
      <div className='faq-content-container'>
       {content.map(({question,answer},i)=><Content question={question} answer={answer} key={i}/>)}
      </div>
    </section>
  )
}

export default () => {
  return (
    <div className='faq-page'>
    {FaqMenu()}
    {
      data.map(({headline,content},i)=>{
        return (
          <Category
             id={"faq-category-"+i}
             key={i}
             headline={headline}
             content={content}/>
        )
      })
    }
    </div>
  )
}
