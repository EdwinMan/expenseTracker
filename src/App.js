import React, {useState, useCallback} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import Auth from './MainPages/Auth'
import MainApp from './MainPages/MainApp'
import { AuthContext } from './context/auth-context'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientID, setClientID] = useState(0);

  const login = useCallback( ()=> {
    setIsLoggedIn(true);
  })

  const logout = useCallback( ()=> {
    setIsLoggedIn(false);
  })

  const setUserID = useCallback( (id)=> {
    setClientID(id);
  })

  // function setUserID(id){
  //   setClientID(id)
  // }


  let routes;

  if(isLoggedIn){
    routes = (
      <React.Fragment>
        <Route path="/home">
          <MainApp/>
        </Route>
        <Redirect to="/home" />
      </React.Fragment>
    );
  }else {
    routes = (
      <React.Fragment>
        <Route exact path="/auth">
          <Auth/>
        </Route>
        <Redirect to="/auth" />
      </React.Fragment>
    );
  }

  return (<div className="App">
    <AuthContext.Provider
    value={ { isLoggedIn:isLoggedIn, login: login, logout:logout, ClientID:clientID, clientIDsetter:setUserID } }
    >
      <Router> 
        <Switch>
          {routes}
        </Switch>
      </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
