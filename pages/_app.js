import React from 'react'
import App from 'next/app'
import {Provider} from "react-redux";
import fetch from 'isomorphic-unfetch';
import withRedux from "next-redux-wrapper";
import makeStore from "../components/store";
import MainLayout from '../layout/main.js'
import {loginUser} from '../components/actions/user'
import {notChrome} from '../components/actions/browser'
import Router from 'next/router'

class MyApp extends App {
  constructor(props){
    super(props)
  }

  static async getInitialProps({ctx}) {
    if(ctx&&ctx.req&&ctx.req.user){
      ctx.store.dispatch(loginUser(ctx.req.user))
    }
 }

  render() {


  let { Component, store} = this.props
    return (
        <Provider store={store}>
          <MainLayout>
              <Component  />
          </MainLayout>
        </Provider>

    )
  }
}

export default withRedux(makeStore,{debug:true})(MyApp);
