import React, { useState, useEffect, useContext } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
// import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import ExpenseTableView from './ExpenseTableView'
import './ExpenseTable.css'

import { AuthContext } from '../../../context/auth-context'

const axios = require('axios').default;

export default function Expense() {

    const auth = useContext(AuthContext); 

    const [view, setView] = useState("")//table name
    const [data, setData] = useState([])//data from backend
    const [input, setInput] = useState()


    function getCategories(){
        const url = ("http://127.0.0.1:8000/client/categories/"+auth.ClientID);
        axios.get(url).then(res => {
            setData(res.data);
            });
    }

    useEffect(() => 
    {
        getCategories();
    }
    , []);

    function createCatHandler(){
        const url = ("http://127.0.0.1:8000/api/categories");
        axios.post(url,{"name": input, "client_id":auth.ClientID})// id should get from context hook
        .then( (res)=>{
            console.log(res);
            getCategories();
        });
    }

    function deleteCatHandler(name){
        
        const url = ("http://127.0.0.1:8000/api/categories");
        axios.delete(url,{data : {"name": name, "client_id":auth.ClientID}})// id should get from context hook
        .then( (res)=>{
            console.log(res);
            getCategories();
        });
        
    }

    return (
        
        view === "" ?
        <div>
            <div className="addNewCat">
                {/* <input type="text" placeholder="Category name" onChange={(e)=> setInput(e.target.value)} /> */}
                {/* <button onClick={createCatHandler}>Create</button> */}
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Category name"
                    onChange={(e)=> setInput(e.target.value)}
                    />
                    <InputGroup.Append>
                    <Button className="btn" variant="outline-secondary" onClick={createCatHandler}>Create</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            
            <div className="listCatContainer">
            {/* {data.map( (table, i)=>
            <div key={i} className="listCat">
                <div onClick={() => setView(table.name)} className="ExpenseTableContainer">
                    <h3>{table.name}</h3>
                </div>
                <button onClick={()=>{deleteCatHandler(table.name)}}>delete</button>
            </div>)} */}
                        {data.map( (table, i)=>
                <div key={i} className="listCat">
                    <div >
                        <Card className="text-center">
                            <Card.Header onClick={() => setView(table.name)}><b><h4>{table.name}</h4></b></Card.Header>
                                <Card.Body>
                                    <Button variant="danger" onClick={()=>{deleteCatHandler(table.name)}}>DELETE</Button>
                                </Card.Body>
                        <Card.Footer className="text-muted">{table.created_at.substring(0, 10)}</Card.Footer>
                        </Card>
                    </div>
                </div>)}
            </div>

        </div>
        :
        <div>
            <Jumbotron fluid>
                <Container>
                <div className="sansserif">{view}</div>
                </Container>
            </Jumbotron>        
            <div className="tableDisplayer">
            <ExpenseTableView tableName={view}/>
            </div>
            
            <Button variant="secondary" onClick={() => setView("")}>Back to Categories</Button>
        </div>

    )}
