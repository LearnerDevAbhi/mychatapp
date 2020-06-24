import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Signup from "./signup/signup";
import Dashboard from "./dashboard/dashboard";
import Login from "./login/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects?????

firebase.initializeApp({
  apiKey: "AIzaSyAuA-XlqG5HUqdnNw7M9IF5AX6avrRPCJ0",
  authDomain: "newchatapp-decaf.firebaseapp.com",
  databaseURL: "https://newchatapp-decaf.firebaseio.com",
  projectId: "newchatapp-decaf",
  storageBucket: "newchatapp-decaf.appspot.com",
  messagingSenderId: "878800767099",
  appId: "1:878800767099:web:747b60e82ff91dfec6fade",
  measurementId: "G-Y48H7VPYFM"
});

class Routing extends Component {
  render() {
    return (<Router>
      <>
        <Route path='/signup' component={Signup}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>

      </>

    </Router>
    )
  }

}

ReactDOM.render(
  <Routing />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
