import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../actions/user'
import './main.scss'


class Status extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    fetch('/api/v1/account/details')
    .then(data=>data.json())
    .then(data=> this.props.dispatch(loginUser(data.user)))
    .catch(err=>console.log(err))
  }

  async onlinePay()  {
    let response = await fetch('/api/v1/stripe/session',{
      method:'POST',
      body:JSON.stringify({amount:300.50})
    })

    let {session,key} = await response.json()
    let stripe =  window.Stripe(key)
    this.setState({stripe, session})
    stripe.redirectToCheckout({
      sessionId:session.id
    })
  }

  render(){
    let {user} = this.props
    return !user?null:(
      <div className='status-container regular-font'>
        <div><p>Registration Status &rarr;</p></div>
        <div>{user.chargeSucceeded?'Payment received! We will be working to getting your LLC created for your vehicle registrations':user.isFinanced?'We will contact you shortly on whether or not you being already financed will conflict with the registration under a Montana LLC':'We will try to reach out to you shortly for payment details to get the process started! Feel free to contact us if you prefer'}</div>

        <div><p>Registered Email &rarr;</p></div>
        <div>{user.email}</div>

        {user.chargeSucceeded? null:
          (<>
            <div><p>Want to pay online? &rarr;</p></div>
            <div><button className='ripple online-pay-status' onClick={()=>{this.onlinePay()}}>Pay Online</button></div>
            </>
          )
        }
      </div>
    )
  }
}

export default connect(state => state)(Status);
