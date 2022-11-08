import React, {Component} from 'react'
import {LoadRegistration, LoadStatus, LoadAddVehicle} from './loadable'
import {connect} from 'react-redux'
import './main.scss'
import Loading from '../Loading'

const loading = () => <div className='account-loading-screen'><Loading/></div>

class Account extends Component{
  constructor(props) {
    super(props);
    this.state = {
      view:'status'
    };
  }

  componentDidMount(){
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    if(view==='registration'||!this.props.user||!this.props.user.firstName){
      this.setState({view:'registration'})
      return
    }
  }

  renderContent(){
    switch(this.state.view){
      case 'registration':
      return <LoadRegistration changeView={this.changeView}/>
      case 'add vehicle':
        return <LoadAddVehicle changeView={this.changeView}/>
      default:
      return <LoadStatus changeView={this.changeView}/>

    }
  }

  changeView = (view = 'status') => {
    this.setState({view})
  }


  render() {
    const {view} = this.state
    return (
      <div className='account-container'>
        <nav className='account-side-bar regular-font'>
          <ul>
          {
            this.props&&this.props.user&&this.props.user.firstName?(
            <li className={`account-side-bar-list-item ${view==='status'?'account-side-bar-list-item-active':null}`}>
            <div  onClick={()=>{
              this.changeView('status')
            }}>Status</div>
            </li>)
            :null
          }

              {
                !this.props&&!this.props.user&&!this.props.user.firstName?(
                <li className={`account-side-bar-list-item ${view==='registration'?'account-side-bar-list-item-active':null}`}>
                <div  onClick={()=>{
                  this.changeView('registration')
                }}>Registration</div>
                </li>)
                :null
              }
          </ul>
        </nav>
        <main className='account-main-content'>
        {this.renderContent()}
        </main>
      </div>
    );
  }
}
export default connect(state => state)(Account);
