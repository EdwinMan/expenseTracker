import React, {useState, useCallback, useContext} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    NavLink
  } from "react-router-dom";
import { AuthContext } from '../../context/auth-context'

export default function Navigations() {

    const auth = useContext(AuthContext);

    function logoutHandler(){
        auth.clientIDsetter(0);
        auth.logout();
    }

    return (
        <div>
            {/* <Link to="/home/Dashboard">Dashboard</Link> */}
            
            <Card style={{ width: '12rem', height:'45rem', border:'2px solid gainsboro' }}>
            <Card.Header style={{ borderTop:'3px solid gainsboro',borderLeft:'3px solid gainsboro',borderRight:'3px solid gainsboro' }}
            ><b>Navigations</b></Card.Header>
            <ListGroup as="ul">

                
                <NavLink to="/home/Dashboard">
                <ListGroup.Item action>
                <div className="styleless">
                    Dashboard
                </div>
                </ListGroup.Item>
                </NavLink>
                

                <NavLink to="/home/Expense">
                <ListGroup.Item action>
                Expense
                </ListGroup.Item>
                </NavLink>

                <NavLink to="/home/Profile">
                <ListGroup.Item action>
                Profile
                </ListGroup.Item>
                </NavLink>

                <ListGroup.Item 
                action
                style={{ borderBottom:'2px solid gainsboro'}}
                 onClick={logoutHandler}>
                Logout
                </ListGroup.Item>


            </ListGroup>
            </Card>



        </div>

    )
}
