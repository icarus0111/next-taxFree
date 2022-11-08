import withRedux from "next-redux-wrapper";
import {createStore} from "redux";
import rootReducer from './reducer'


const makeStore = (initialState, options) => {
    return createStore(
      rootReducer,
      initialState
    )
};

export default makeStore
