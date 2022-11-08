import React, {PureComponent} from 'react'
import './main.scss'

class Testimonial extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      position:0,
      data:[
        {
          content:`I have saved so much money over the years working with TaxFreeRV.  We have had everything from our RV to our personal vehicles, to our toys, registered under our Montana LLC.  TaxFreeRV is always helpful and professional.  I refer them to everyone we know!`,
          author:"Ed"
        },
        { content:`My husband and I just recently purchased a brand new RV and when we heard what we were going to have to pay to Title and Register this RV in MO we were in shock.  A friend of ours referred us to TaxFreeRV and we are so glad they did!  We saved so much money on titling and registering our RV through TaxFreeRV.`,
        author:'Steve and Linda'
        },
        {
          content:`I’m so glad I called TaxFreeRV and registered my 5th Wheel through them.  We saved so much money because our 5th wheel was eligible for a Permanent plate through the state of Montana.`,
          author:'William'
        },
        {
          content:`I missed the window in which I had to have my RV registered in my home state and I was facing a very large bill.  I called TaxFreeRV and they were able to get my RV titled and registered without any late fees or penalties.  I saved so much money and TaxFreeRV is great to work with!`,
          author:'Lynne'
        }
      ]
    }
  }

  componentDidMount(){
    this.intervalID = setInterval(()=>{this.updatePosition('right')}, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }


  handleClick(direction){
    this.updatePosition(direction)
    clearInterval(this.intervalID);
  }

  reverseContent(){
    let data = [...this.state.data]
    data = data.map((d,i,list)=>list[list.length-i-1])
    this.setState({data})
  }

  updatePosition(direction){
    let {data,position} = this.state
    let updatePosition = direction==='left'?
                !position?
                'avoid':position-1
                :
                data.length-1===position?
                'avoid':position+1
    if(updatePosition ==='avoid') {
      let data = [...this.state.data]
      let position = direction==='left'?0:data.length-1
      data = data.reverse()
      this.setState({data,position})
      return
    }
    this.setState({position:updatePosition})
  }

  renderTestimonials(){
    let {position} = this.state
    return this.state.data.map((testimonial,i)=>{
      let isActive = i===position? 'testimonial-active':
                      i<position? 'testimonial-inactive-left':'testimonial-inactive-right'
      return   (
        <div key={i} className={`testimonial-container ${isActive}`}>
         <p className="regular-font">
          {`"${testimonial.content}"`}
         </p>
         <p className=" regular-font testimonial-author-contribution">
          {`--${testimonial.author}`}
         </p>
        </div>)
    })
  }

  render(){
  return (
      <div className="testimonials-container">
       <header className="regular-font">Testimonials</header>
        <div className="carousel">
        <button
           className='testimonial-btn testimonial-btn-left'
           onClick={()=>{this.handleClick('left')}}>
         &lsaquo;
        </button>
        {this.renderTestimonials()}
        <button
           className='testimonial-btn testimonial-btn-right'
           onClick={()=>{this.handleClick('right')}}>
           &rsaquo;
         </button>
        </div>
      </div>
    )
  }
}

export default Testimonial
