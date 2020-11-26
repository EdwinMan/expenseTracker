import React, {useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './MainApp.css'

import Navigations from './MainAppPages/Navigations'
import Dashboard  from './MainAppPages/Dashboard/Dashboard'
import Expense  from './MainAppPages/Expense/Expense'
import Profile  from './MainAppPages/Profile/Profile'
import Welcome  from './MainAppPages/WelcomingPage/Welcome'
import { AuthContext } from '../context/auth-context'
export default function MainApp() {

    const auth = useContext(AuthContext);

    return (
        <div>
            {console.log(auth.ClientID)}
            <Router>
                <div className="mainAppContainer">
                    <Navigations/>
                        
                    <div className="displayContainer">
                        <Switch>
                            <Route exact path="/home/Dashboard"> <Dashboard/> </Route>
                            <Route exact path="/home/Expense"> <Expense/> </Route>
                            <Route exact path="/home/Profile"> <Profile/> </Route>
                            <Welcome/>
                        </Switch>
                    </div>

                </div>
            </Router>
        
        </div>
    )
}
