import React, {Component} from 'react'
import SignatureCanvas from 'react-signature-canvas'
import './main.scss'

class Contract extends Component  {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    window.scrollTo(0, 0)
    this.sigCanvasContract.fromData(this.props.dataPoints)
  }
  componentWillUnmount(){
    window.scrollTo(0,document.body.scrollHeight)
  }

  render(){
    let formattedDate = `${new Date().toISOString().split('T')[0]}`
    let {
      handleCloseReviewAgreement,
      firstName,
      lastName
      } = this.props
      let name = `${firstName || "FIRST NAME"} ${lastName||'LAST NAME'}`

    return(
      <div id="contract-container">
        <button
          className="contract-hide-btn"
          onClick={handleCloseReviewAgreement}
          >x</button>
        <div id="contract-content">
        <div className="contact-top-section">
          <div className='royal-font'>TaxFreeRV</div>
          <div className='royal-font'>03-107-F</div>
        </div>
        <h6 className='contract-title royal-font'>
          Agreement to Form a Limited Liability Company and Register
          Vehicles Under the Laws of the State of Montana.
        </h6>
        <p className='contract-paragraph regular-font'>
          {`Pursuant to the terms of this agreement, TaxFreeRV will form for ${name} a Limited Liability Company under the laws of the State of Montana for the purpose of taking advantage of Montana's low registration fees, taxes, and inspection requirements for recreational vehicles.  LLC Agency Services, LLC, or Montana RV Consulting, LLC will serve as registered agent in the State of Montana for the Company hereunder. ${name} agrees to pay all ongoing annual renewal fees in a timely manner to TaxFreeRV as registered agent as long as any vehicles are registered under the Montana company and LLC Agency Services, LLC, or Montana RV Consulting, LLC act as the registered agent. ${name} agrees to register any additional Montana company vehicles through  TaxFreeRV.`}
        </p>
        <p className='contract-paragraph regular-font'>
          The Company is statutorily defined as a Montana “resident” and is legally a citizen of the State of Montana.  Because Montana has no sales or property tax on recreational vehicles, vehicles purchased and owned by a Montana business entity are not subject to sales tax by Montana, regardless of where the vehicle is initially purchased.
        </p>

        <p className='contract-paragraph regular-font'>
          States other than Montana may have legal requirements that conflict with Montana law. TaxFreeRV does not provide any representation or warranty with respect to the legal requirements of States other than Montana.  The services of TaxFreeRV are limited to forming the Montana business entity in compliance with Montana law, and registering the vehicle or vehicles in compliance with Montana law.  The services of LLC Agency Services LLC and Montana RV Consulting, LLC are limited to serving as registered agent and business office in the state of Montana.  You are strongly encouraged to consult with independent, local, legal and accounting professionals to discuss the full legal and tax consequences in your home state. Further, you are solely responsible for determining if you meet your States’ statutory requirements for this program.
        </p>

        <p className='contract-paragraph regular-font'>
          If you have held title to the vehicle(s) that is to be owned by the Montana LLC personally and are transferring the ownership of the RV from you to the Montana LLC, there could be a tax liability with your resident state. TaxFreeRV suggests that you consult with an in-state attorney to determine if any liability exists.
        </p>

        <p className='contract-paragraph regular-font'>
          <u>Arbitration of Disputes.</u>
          Any claim arising out of or relating to this Agreement or any services provided pursuant to this agreement by either TaxFreeRV, Agency Services LLC, or Montana RV Consulting, LLC including, but not limited to, its validity, interpretation, breach and termination, will be settled by binding arbitration conducted in Billings, Montana before a board of three arbitrators, in accordance with the Commercial Arbitration Rules of the American Arbitration Association ("AAA") then in effect.  The arbitrators shall apply the law of the State of Montana. In any arbitration proceedings hereunder, (a) all testimony of witnesses must be taken under oath; (b) discovery will be allowed to the same extent as available under the then current Federal Rules of Civil Procedure; and (c) the board will apply the Federal Rules of Evidence.  Each party agrees that the arbitration provisions of this Agreement are its exclusive damage remedy and expressly waives any right to seek redress in another forum.  Each party must bear the fees of the arbitrator appointed by it, and the fees of the neutral arbitrators must be borne equally by each party during the arbitration, but the fees of all arbitrators must be borne by the losing party.
        </p>

        <p className='contract-paragraph regular-font'>
          <u>Governing Law; Jurisdiction.</u>
          {`This Agreement will be governed by the laws of the State of Montana without regard to the conflict of laws provisions of that state or any other jurisdiction.  Each party hereby irrevocably consents, for itself and its legal representatives, successors and assigns, to the exclusive jurisdiction of the courts of the State of Montana for all purposes in connection with any action or proceeding that arises from or relates to this Agreement, and further agrees that, subject to the agreement regarding Arbitration of Disputes, any action arising from or relating to this Agreement, and any action confirming an arbitration award and entering judgment thereon, must be instituted and prosecuted only in the courts of the State of Montana, and hereby agrees that venue shall be proper in the Montana 22nd Judicial District Court, Carbon County, Montana.`}
        </p>

        <p className='contract-paragraph regular-font'>
          <u>Limitation of Time</u>
          Each party hereby agrees that all claims arising out of or relating to this Agreement or any services provided pursuant to this agreement by TaxFreeRV shall be brought within one year of the event from which the claim arises.
        </p>

        <p className='contract-paragraph regular-font'>
{`This Agreement constitutes the parties' entire agreement with respect to the subject matter hereof and shall not be amended, altered or modified except by a writing signed by the parties. `}
        </p>

        <div className='contract-paragraph contract-signature regular-font'>
          <div className="contract-line-wrapper">
            <div className="signature-wrapper">
              <SignatureCanvas
              penColor='green'
              canvasProps={{width: 320, height: 200, className: 'sigCanvas'}}
              ref={(ref) => { this.sigCanvasContract = ref }}
              />
            </div>
            <p>{formattedDate}</p>
          </div>
          <hr/>
          <div className="contract-signature-bottom-portion">
            <p>{name}</p>
            <p>Date</p>
          </div>
        </div>
        </div>
        <div>
          <button id='contract-close-btn' className='ripple regular-font' onClick={()=>{this.props.handleCloseReviewAgreement()}}>Close</button>
        </div>
      </div>
    )
  }
}

export default Contract
