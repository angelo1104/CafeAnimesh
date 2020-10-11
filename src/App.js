import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignIn from "./Components/Login/SignIn";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import Home from "./Components/Home/Home";
import AdminHome from "./Components/Admin/AdminHome/AdminHome";

function App() {
    //eslint-disable-next-line
  const [state,dispatch] = useStateValue()

  useEffect(()=>{
      auth.onAuthStateChanged((authUser)=>{
          if (authUser){
              dispatch({
                  type: 'SET_USER',
                  user: authUser
              })
          }else {
              dispatch({
                  type:'SET_USER',
                  user: null
              })
          }
      })
  },[dispatch])

  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path={'/admin'}>
                    I am admin
                </Route>
                <Route path={'/accounts/emaillogin'}>
                    <SignIn/>
                </Route>
                <Route path={'/home'}>
                    <Home/>
                </Route>
                <Route path='/'>
                    <Login/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
