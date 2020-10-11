import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignIn from "./Components/Login/SignIn";
import {auth, database} from "./firebase";
import {useStateValue} from "./StateProvider";
import Home from "./Components/Home/Home";
import AdminHome from "./Components/Admin/AdminHome/AdminHome";

function App() {
    //eslint-disable-next-line
  const [state,dispatch] = useStateValue()
  const [userType,setUserType] = useState(null)

  useEffect(()=>{
      auth.onAuthStateChanged((authUser)=>{
          if (authUser){
              database.collection('users')
                  .doc(authUser.email)
                  .get()
                  .then(user=>{
                      setUserType(user.data().userType)
                  })
                  .catch(err=>{
                      console.log(err)
                  })

              dispatch({
                  type: 'SET_USER',
                  user: authUser,
                  userType: userType
              })
          }else {
              dispatch({
                  type:'SET_USER',
                  user: null
              })
          }
      })
  },[dispatch,userType])

  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path={'/admin'}>
                    {<AdminHome/>}
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
