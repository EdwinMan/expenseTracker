import React, { useState, useEffect, useContext } from 'react'
import Image from 'react-bootstrap/Image'
import './Profile.css'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Badge from 'react-bootstrap/Badge'
import {AuthContext} from '../../../context/auth-context';

export default function Profile() {

    const auth = useContext(AuthContext)

    const [fNameInput, setFNameInput] = useState()
    const [lNameInput, setLNameInput] = useState()
    const [ageInput, setAgeInput] = useState()
    const [emailInput, setEmailInput] = useState()
    const [userSince, setUserSince] = useState()
    

    const axios = require('axios').default;
    const [data, setData] = useState([])//data from backend
    
    function getProfile(){
        const url = ("http://127.0.0.1:8000/client/"+auth.ClientID);// Change the ID
        axios.get(url).then(res => {
            setData(res.data);
            setUserSince(res.data.created_at.substring(0,10));
            });
    }

    useEffect(() => 
    {
        getProfile();
    }
    , []);

    // let dummyData = {name:"omar", age:"3-03-3", email:"omar.mansour.info@gmail.com", img:"profilePic.png"}


    function deleteUserHandler(){
        const url = ("http://127.0.0.1:8000/api/profile");
        axios.delete(url,{data : {"id":auth.ClientID}})// id should get from context hook
        .then( (res)=>{
            console.log(res.data);
            auth.clientIDsetter(0);
            auth.logout();
        });
    }

    function updateUserHandler(){
        const url = ("http://127.0.0.1:8000/api/profile");
        axios.patch(url,{"id":auth.ClientID, "firstName":fNameInput, "lastName":lNameInput, "email":emailInput, "age":ageInput})// id should get from context hook
        .then( (res)=>{
            console.log(res.data);
            // auth.clientIDsetter(0);
            // auth.logout();
            getProfile();
        });
    }


    return (
        <div className="profileContainer">
            {/* {console.log(data)} */}
           
            <div className="profileImg">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpLDOtCD44c03qXnpeQJfyYqxoIj-aNNC0hA&usqp=CAU" alt="profilePic.png" roundedCircle />
            </div>

            <h4>
                <Badge variant="secondary">{data.firstName} {data.lastName}</Badge>
            </h4>
            <h4>
                <Badge variant="secondary">{data.email}</Badge>
            </h4>
            <h4>
                <Badge variant="secondary">User Since: {userSince}</Badge>
            </h4>


            <div className="info">
            <InputGroup className="mb-3">
                <FormControl
                placeholder={data.firstName}
                onChange={(e)=> setFNameInput(e.target.value)}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <FormControl
                placeholder={data.lastName}
                onChange={(e)=> setLNameInput(e.target.value)}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <FormControl
                placeholder={data.age}
                onChange={(e)=> setAgeInput(e.target.value)}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <FormControl
                placeholder={data.email}
                onChange={(e)=> setEmailInput(e.target.value)}
                />
            </InputGroup>
            </div>
            <Button variant="warning" onClick={updateUserHandler}>UPDATE ACCOUNT</Button>
            {" "}
            <Button variant="danger" onClick={deleteUserHandler}>DELETE ACCOUNT</Button>

            {/* <h3>{data.age}</h3>
            <h3>{data.email}</h3>
            <h3>User Since:{data.created_at}</h3>
            <button>Change Passowrd</button> */}
        </div>
    )
}
