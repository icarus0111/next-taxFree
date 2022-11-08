import React, {Component} from 'react'
import Router from "next/router";
import Loading from '../../components/Loading'
import './main.scss'

const WithAlreadySignedInRoutes = (WrappedComponent) => {
  return class AlreadySignedInRoutes extends Component{
    constructor(props){
      super(props)
      this.state = {
        loading:true
      }
    }

    componentDidMount(){
          fetch('/api/v1/account/details')
          .then(data => data.json())
          .then(({user})=>{
            if(!user){
              this.setState({loading:false})
              return
            }
            Router.replace('/account')
          })
    }

     render(){
       return <>{this.state.loading?<div className='protected-page-loading-screen'><Loading/></div>: <WrappedComponent/>}</>
     }
  }
}



  export default WithAlreadySignedInRoutes
