import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Banner from "./Components/Banner/Banner";
import OfTheWeek from "./Components/OfTheWeek/OfTheWeek";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path={'/home'}>
                    <Header/>
                    <Banner title='Café Animesh!' imageUrl='http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'/>
                    <OfTheWeek/>
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
