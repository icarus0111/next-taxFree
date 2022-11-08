import React, {Component} from 'react'
import CheckBox from 'react-animated-checkbox';
import {connect} from 'react-redux'
import SignatureCanvas from 'react-signature-canvas'
import  Contract from './Contract'
import {ReImg} from 'reimg'
import Loading from '../Loading'
import './main.scss'

class Registration extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading:false,
      error:"",
      signatureDataPoints:[],
      showContract:false,
      hasReviewedContract:false,
      formDetails:{

        firstName:'',
        lastName:'',

        additionalFirstName:'',
        additionalLastName:'',

        phone:'',
        phone2:'',
        address:'',
        city:'',
        state:'',
        zipcode:'',

        source:'',

        payment:{
          willPayOnline:''
        },

        finance:{
          isFinanced:null,
          lender:'',
          loanType:''
        },

        vehicle:{


        }

      }
  }

  this.handleSignatureClear   = this.handleSignatureClear.bind(this)
  this.handleSignatureSave    = this.handleSignatureSave.bind(this)
  this.handleReviewAgreement  = this.handleReviewAgreement.bind(this)
  this.handleCloseReviewAgreement  = this.handleCloseReviewAgreement.bind(this)
}

handleRadio(field,value){
  if(this.state.formDetails[field].phoneType===value)  return
  let formDetails = {...this.state.formDetails}
  formDetails[field] = value
  this.setState({formDetails})
}

handleChange(field,input){
  let formDetails = {...this.state.formDetails}
  formDetails[field] = input
  this.setState({formDetails})
}

handleSubmit(e){
  e.preventDefault()
}

handleSignatureClear(){
  this.setState({signatureDataPoints:[]})
  this.sigCanvas.clear()
}

handleSignatureSave(){
this.setState({
signatureDataPoints:
this.sigCanvas.toData()})
}

handleReviewAgreement(){

  this.setState({
      showContract:true,
      hasReviewedContract:true
    })
}

handleCloseReviewAgreement(){
  this.setState({
      showContract:false
    })
    setTimeout(()=>{
      this.sigCanvas.fromData(this.state.signatureDataPoints)
    },100)
}

handleIsFinanced(selected){
  let formDetails =  {...this.state.formDetails}
  if(formDetails.finance.isFinanced===selected)return

  if(selected){
    formDetails.finance.isFinanced = true
    this.setState({formDetails})
    }else{
    formDetails.finance.isFinanced = false
    formDetails.finance.lender = ''
    formDetails.finance.loanType = ''
    this.setState({formDetails})
  }
}

handleLoanType(selected){
  let formDetails =  {...this.state.formDetails}
  formDetails.finance.loanType = selected
  this.setState({formDetails})
}

handleLoanName(value){
  let formDetails =  {...this.state.formDetails}
  formDetails.finance.lender = value
  this.setState({formDetails})
}

handlePaymentOption(value){
  let formDetails =  {...this.state.formDetails}
  formDetails.payment.willPayOnline = value
  this.setState({formDetails})
}

isFinancedDetails(){
  return this.state.formDetails.finance.isFinanced? (
    <div>
      <section className='registration-section'>
        <p className='registration-section-title'>
          Lender Details
        </p>
          <div className='registration-input-field-container'>
            <input
              className="regular-font input-field"
              placeholder="Name"
              value={this.state.formDetails.finance.lender}
              onChange={(e)=>{this.handleLoanName(e.target.value)}}
              />
          </div>
      </section>



      <section className='registration-section'>
        <p className='registration-section-title'>
        Loan Type
        </p>
        <div className='registration-radio-field-container'>
          <div className='registration-radio-option-container'>
            <label htmlFor="new">
              New
            </label>
            <CheckBox
                value={this.state.formDetails.finance.loanType==='New'}
                onClick={()=>{this.handleLoanType("New")}}
                checked={this.state.formDetails.finance.loanType==='New'}
                checkBoxStyle={{
                checkedColor: '#73C1B3',
                size: 20,
                unCheckedColor: '#b8b8b8'
            }}
                duration={150}
              />
              </div>
              <div className='registration-radio-option-container'>
              <label htmlFor="refinanced">
                Refinanced
              </label>

              <CheckBox
                  onClick={()=>{this.handleLoanType("Refinanced")}}
                  checked={this.state.formDetails.finance.loanType==='Refinanced'}
                  value={this.state.formDetails.finance.loanType==='Refinanced'}
                  checkBoxStyle={{
                  checkedColor: '#73C1B3',
                  size: 20,
                  unCheckedColor: '#b8b8b8'
              }}
                  duration={150}
                />
            </div>
          </div>
      </section>
    </div>

  ):null
}

handleStripeCheckout = async (e) => {
  let result = this.validateBasicDetails()
  if(!result)return
  this.setState({showContract:true},()=>{
  const domElement = document.getElementById('contract-content')
  const html2canvas = require('html2canvas')

  html2canvas(domElement, { onclone: (document) => {}})
  .then(async(canvas) => {
      let img = ReImg.fromCanvas(canvas)
      img.downloadPng()
      const formData  = new FormData();
  let result = this.validateBasicDetails()
  if(!result)return
  this.setState({loading:true})
  await fetch('/api/v1/email/contract-png',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({email:this.props.user.email,formDetails:this.state.formDetails,data:img.toBase64()})
  })



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
 })
 })
}

handleNonpaymentCheckout = () => {
  let result = this.validateBasicDetails()
  if(!result)return
  if(this.state.formDetails.finance.isFinanced===null){
    return this.handleError('Select if this is financed or not')
  }

  if(this.state.formDetails.finance.isFinanced&&!this.state.formDetails.finance.lender){
    return this.handleError('Provide your lender name')

  }
  if(this.state.formDetails.finance.isFinanced&&!this.state.formDetails.finance.loanType){
    return this.handleError('Select your loan type')
  }

  this.sendNonPaymentDetails()
}


sendNonPaymentDetails(){
this.setState({showContract:true},()=>{
      const domElement = document.getElementById('contract-content')
      const html2canvas = require('html2canvas')

      html2canvas(domElement, { onclone: (document) => {}})
      .then((canvas) => {


          let img = ReImg.fromCanvas(canvas)
          img.downloadPng()
          const formData  = new FormData();
          this.setState({loading:true})
          fetch('/api/v1/email/contract-png',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({email:this.props.user.email,formDetails:this.state.formDetails,data:img.toBase64()})
          }).then(()=>{
            // this.handleResetFormData()\
            this.props.changeView('status')
          })
        })
      })





}

handleError = error => {
  this.setState({error})
  setTimeout(()=>{
    this.setState({error:''})
  },5000)
}

validateBasicDetails(){
  let {firstName,lastName,additionalFirstName,additionalLastName,phone,address,city,state,zipcode} =
   this.state.formDetails
   const phoneCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(!firstName){
    this.handleError('Provide your first name')
    return false
  }
  if(!lastName){
    this.handleError('Provide your last name')
    return false
  }
  if((additionalFirstName&&!additionalLastName)||(additionalLastName&&!additionalFirstName)){
    this.handleError(`Complete the additional person's name`)
    return false
  }
  if(!phone){
    this.handleError('Provide your phone number')
    return false
  }
  if(!phoneCheck.test(phone)){
     this.handleError('Provide a valid phone # to contact you with')
     return false
  }
  if(!address||!city||!state||!zipcode){
    this.handleError('Provide complete details on your address')
    return false
  }
  if(!this.state.signatureDataPoints.length){
    this.handleError('Provide your signature')
    return false
  }
  if(!this.state.hasReviewedContract){
    this.handleError('Review the service agreement')
    return false
  }
  return true
}


  render(){
    let {formDetails,loading} = this.state
    return loading?(
     <div className='registration-loading-screen'><Loading/></div>
   ):(

      <main className='registration-page'>
      {this.state.showContract?(
        <Contract
          dataPoints ={this.state.signatureDataPoints}
          that={this}
          handleCloseReviewAgreement={this.handleCloseReviewAgreement}
          firstName={this.state.formDetails.firstName}
          lastName={this.state.formDetails.lastName}
          />):(
          <form className="registration-page-form regular-font"
            onSubmit={this.handleSubmit}>
            <section className='registration-section'>
              <p className='registration-section-title'>
                Name
              </p>
              <div className='registration-input-field-container'>
                <input
                  className="regular-font input-field"
                  placeholder="First"
                  value={formDetails.fname}
                  onChange={(e)=>{this.handleChange('firstName',e.target.value)}}
                  />
                <input
                  className="regular-font input-field"
                  placeholder="Last"
                  value={formDetails.lname}
                  onChange={(e)=>{this.handleChange('lastName',e.target.value)}}
                  />
              </div>
            </section>
            <section className='registration-section'>
              <p className='registration-section-title'>
                {`Additional Person's Name to put on LLC (optional)`}
              </p>
              <div className='registration-input-field-container'>
                <input
                  className="regular-font input-field"
                  placeholder="First"
                  value={formDetails.fname}
                  onChange={(e)=>{this.handleChange('additionalFirstName',e.target.value)}}
                  />
                <input
                  className="regular-font input-field"
                  placeholder="Last"
                  value={formDetails.fname}
                  onChange={(e)=>{this.handleChange('additionalLastName',e.target.value)}}
                  />
              </div>
            </section>
            <section className='registration-section'>
              <p className='registration-section-title'>
              Address
              </p>
              <div className='registration-input-field-container'>
                <input
                  className="regular-font input-field full-input-field"
                  placeholder="Street Address"
                  value={formDetails.address}
                  onChange={(e)=>{this.handleChange('address',e.target.value)}}
                  />
                <input
                  className="regular-font input-field"
                  placeholder="City"
                  value={formDetails.city}
                  onChange={(e)=>{this.handleChange('city',e.target.value)}}
                  />
                <input
                  className="regular-font input-field"
                  placeholder="State"
                  value={formDetails.state}
                  onChange={(e)=>{this.handleChange('state',e.target.value)}}
                  />
                <input
                  className="regular-font input-field"
                  placeholder="Zip Code"
                  value={formDetails.zipcode}
                  onChange={(e)=>{this.handleChange('zipcode',e.target.value)}}
                  />
              </div>
            </section>

            <section className='registration-section'>
              <p className='registration-section-title'>
                Contact Details
              </p>
              <div className='registration-input-field-container'>
                <input
                  type="tel"
                  className="regular-font input-field"
                  placeholder="Primary Phone #"
                  value={formDetails.phone}
                  onChange={(e)=>{this.handleChange('phone',e.target.value)}}
                  />
                <input
                  type="tel"
                  className="regular-font input-field"
                  placeholder="Secondary Phone # (optional)"
                  value={formDetails.phone2}
                  onChange={(e)=>{this.handleChange('phone2',e.target.value)}}
                  />
                </div>
            </section>

            <section className='registration-section'>
              <p className='registration-section-title'>
                How did you hear about us? (Optional)
              </p>
              <div className='registration-input-field-container'>
              <input
                className="regular-font input-field"
                placeholder="Source"
                value={formDetails.source}
                onChange={(e)=>{this.handleChange('source',e.target.value)}}
                />
              </div>
            </section>

            <section className='registration-section'>
              <p className='registration-section-title'>
                Is your Vehicle Financed?
              </p>
              <div className='registration-radio-field-container'>
              <div className='registration-radio-option-container'>
                <label htmlFor="yes">
                  Yes
                </label>
                <CheckBox
                    onClick={()=>{this.handleIsFinanced(true)}}
                    value={formDetails.finance.isFinanced}
                    checked={formDetails.finance.isFinanced===true}
                    checkBoxStyle={{
                    checkedColor: '#73C1B3',
                    size: 20,
                    unCheckedColor: '#b8b8b8'
                }}
                    duration={150}
                  />
                  </div>
                  <div className='registration-radio-option-container'>
                  <label htmlFor="no">
                    No
                  </label>
                  <CheckBox
                      checked={formDetails.finance.isFinanced===false}
                      value={formDetails.finance.isFinanced===false}
                      onClick={()=>{this.handleIsFinanced(false)}}
                      checkBoxStyle={{
                      checkedColor: '#73C1B3',
                      size: 20,
                      unCheckedColor: '#b8b8b8'
                  }}
                      duration={150}
                    />
                  </div>
               </div>
              </section>

              {this.isFinancedDetails()}
              <>
                <section className='registration-section'>
                  <p className='registration-section-title'>
                    Cost Breakdown
                  </p>
                  <div className='container-flex'>
                    <p>LLC Cost:</p>
                    <p>{`$895.00`}</p>
                  </div>
                  <div className='container-flex'>
                    <p>LLC Filing Fee:</p>
                    <p>{`$95.00`}</p>
                  </div>

                    <p className="regular-font disclaimer">{`*Montana license plate cost will be charged at a later date once we have the exact vehicle specifications`}</p>
                </section>

                <section className='registration-section'>
                  <p className='registration-section-title'>
                    Do you want to be charged online now and start the process or provide your payment details at a later date through one of our representatives?
                  </p>
                  <div className='registration-radio-field-container'>
                    <div className='registration-radio-option-container'>
                      <label htmlFor="online">
                        Pay Online Now
                      </label>
                      <CheckBox
                          checked={formDetails.payment.willPayOnline==='online'}
                          value={formDetails.payment.willPayOnline==='online'}
                          onClick={()=>{this.handlePaymentOption('online')}}
                          checkBoxStyle={{
                          checkedColor: '#73C1B3',
                          size: 20,
                          unCheckedColor: '#b8b8b8'
                      }}
                          duration={150}
                        />
                        </div>
                        <div className='registration-radio-option-container'>
                        <label htmlFor="no">
                          Provide payment details at a later date
                        </label>
                        <CheckBox
                            checked={formDetails.payment.willPayOnline==='To be contacted'}
                            value={formDetails.payment.willPayOnline==='To be contacted'}
                            onClick={()=>{this.handlePaymentOption('To be contacted')}}
                            checkBoxStyle={{
                            checkedColor: '#73C1B3',
                            size: 20,
                            unCheckedColor: '#b8b8b8'
                        }}
                            duration={150}
                          />
                      </div>
                   </div>
                </section>
              </>

            <section className='registration-section'>
              <button
                className='registration-btn regular-font ripple'
                onClick={this.handleReviewAgreement}
                >
                Review Service Agreement
              </button>
              <div className='registration-radio-option-container registration-section-title'>
                <label style={{ 'marginLeft': '13px'}}>Reviewed Service Agreement</label>
                <CheckBox
                    checked={this.state.hasReviewedContract}
                    value={this.state.hasReviewedContract}
                    checkBoxStyle={{
                    checkedColor: '#73C1B3',
                    size: 20,
                    unCheckedColor: '#b8b8b8'
                }}
                    duration={150}
                  />
                </div>
            </section>

            <section className='registration-section'>
            <p className='registration-section-title'>
              Your Signature {formDetails.payment.willPayOnline==='To be contacted'?'-- Just to be saved for later.\n Will not start process':""}
            </p>
            <div className='registration-signature-container'>
              <div className='registration-signature-wrapper'>
                <SignatureCanvas
                  onEnd={this.handleSignatureSave}
                  ref={(ref) => { this.sigCanvas = ref }}
                  penColor='green'
                  canvasProps={{width: 320, height: 200, className: 'sigCanvas'}} />
              </div>

              <button
                className='registration-btn regular-font ripple'
                onClick={this.handleSignatureClear}>
                  Clear Signature
              </button>
            </div>
            </section>

            <div className="registration-bottom-portion">
              {this.state.error?(
              <div className='registration-error-message-container'>
                <div className='registration-error-message-content'>
                  {this.state.error}
                </div>
                <button onClick={()=>{this.setState({error:''})}} className='registration-error-message-close-btn'>
                  X
                </button>
              </div>
              ):null
            }
              {formDetails.payment.willPayOnline==='online'?(
              <section className='registration-section'>
                <button
                  className='registration-btn regular-font ripple'
                  onClick={this.handleStripeCheckout}
                >Submit
                </button>
              </section>
              ):
              <section className='registration-section'>
                <button
                  className='registration-btn regular-font ripple'
                  onClick={this.handleNonpaymentCheckout}
                >Submit
                </button>
              </section>
          }
          </div>

          </form>)
        }

      </main>
    )
  }

}


export default connect(state => state)(Registration);
