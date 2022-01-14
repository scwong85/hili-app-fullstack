import React, { useEffect } from "react";
import { connect } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";
import BaseRouter from "../../routes";

import * as action from '../../store/actions/auth';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App(props) {

  useEffect(() => {
    props.onTryAutoSignup();
  }, [])


  return (
    <div className="App">
      <Router>
        <BaseRouter />
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);