import React, {useState, useContext} from 'react'


import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import InputIcon from '../shared/components/Input/InputIcon';
import Alert from 'react-bootstrap/Alert';

import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
    } from '../shared/util/validators';

import { useForm } from '../shared/hooks/form-hook';

import './Auth.css';



import { AuthContext } from '../context/auth-context'

const axios = require('axios').default;

export default function Auth() {

  const [loginMode, setLoginMode] = useState(true)
  
  const [failedLoginMsg, SetfailedLoginMsg] = useState(false)

  const [registerUsername, setRegisterUsername] = useState()
  const [registerFirstName, setRegisterFirstName] = useState()
  const [registerLastName, setRegisterLastName] = useState()
  const [registerEmail, setRegisterEmail] = useState()
  const [registerAge, setRegisterAge] = useState()
  const [registerPassword, setRegisterPassword] = useState()
  const [registerPasswordCheck, setRegisterPasswordCheck] = useState()



    const [formState, inputHandler] = useForm(
        {
          email: {
            value: '',
            isValid: false
          },
          password: {
            value: '',
            isValid: false
          }
        },
        false
      );//

    const auth = useContext(AuthContext);


    async function loginHandler(){
      console.log(formState.inputs.email.value) //username
      console.log(formState.inputs.password.value) //passowrd
      const url = ("http://127.0.0.1:8000/api/login");
      await axios.post(url,{"email": formState.inputs.email.value, "password":formState.inputs.password.value})
      .then(res => {
          console.log(res.data);
          if(res.data.message){
            SetfailedLoginMsg(true);
          }
          else{
          auth.clientIDsetter(res.data.user.id);//auth.clientIDsetter(1);
          auth.login();
          }
          });
    }


    async function registerHandler(){
    
      const url = ("http://127.0.0.1:8000/api/register");
      await axios.post(url,{
        'firstName': registerFirstName,
        'lastName':registerLastName,
        'age':registerAge,
        'username':registerUsername,
        'email':registerEmail,
        'password':registerPassword,
        'c_password':registerPasswordCheck
        })
      
      .then(res => {
          console.log(res.data);
          setLoginMode(true);
          });

    }

    return ( loginMode ?
         //LOGIN UP
        <div className="authContainer">

            <Input
             element="input"
             id="email"
             type="email"
             label="Email"
             validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email."
              onInput={inputHandler}
             />

            <div className="authElement">
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a password."
               onInput={inputHandler}
            />
            </div>

            <Button type="submit" onClick={loginHandler} disabled={!formState.isValid}>
                 LOGIN
            </Button>
            <Button type="submit" onClick={()=>{setLoginMode(false)}}>
                 Sign Up
            </Button>
            
            
    
       

            {failedLoginMsg?<div><br/><Alert variant="danger">Wrong Email or Passowrd</Alert></div> : null}
        </div>
        :
        //Sign UP
        <div className="authContainer">

          <h4>username</h4><input onChange={(e)=>{setRegisterUsername(e.target.value)}} />
          <h4>First Name</h4><input onChange={(e)=>{setRegisterFirstName(e.target.value)}} />
          <h4>Last Name</h4><input onChange={(e)=>{setRegisterLastName(e.target.value)}} />
          <h4>Email</h4><input onChange={(e)=>{setRegisterEmail(e.target.value)}} />
          <h4>Age</h4><input onChange={(e)=>{setRegisterAge(e.target.value)}} />
          <h4>Passowrd</h4><input onChange={(e)=>{setRegisterPassword(e.target.value)}} />
          <h4>Reapeat Password</h4><input onChange={(e)=>{setRegisterPasswordCheck(e.target.value)}} />
          <br/><br/>

          <Button type="submit" onClick={()=>{setLoginMode(true)}} >
                 LOGIN
            </Button>
            <Button type="submit" onClick={registerHandler}>
                 Sign Up
            </Button>
        </div>

    )
}
