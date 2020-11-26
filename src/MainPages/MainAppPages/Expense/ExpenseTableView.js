import React, { useState, useEffect, useContext } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../../context/auth-context';
import Button from 'react-bootstrap/Button'
const axios = require('axios').default;


export default function ExpenseTableView(props) {

    const auth = useContext(AuthContext); 

    const [data, setData] = useState([])//data from backend
    const [nameInput, setnameInput] = useState("")//data from backend
    const [amountInput, setAmountInput] = useState()//data from backend
    const [index, setIndex] = useState(1)//data from backend
    

    function displayTableData(){
        const url = ("http://127.0.0.1:8000/api/expenses");
        axios.post(url,{'id': auth.ClientID,'category_name':props.tableName})// id should get from context hook
        .then(res => {
            setData(res.data);
            setIndex(res.data.length)
            });
    }
    

    useEffect(() => 
    {
        displayTableData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);



function deleteHandler(id){
    const url = ("http://127.0.0.1:8000/api/expenses");
    axios.delete(url, {data : {"id" : id}} ).then(response => {
        // console.log(response)
        displayTableData();
  })
}

function createHandler(name,amount){
    const url = ("http://127.0.0.1:8000/api/expenses/newExpense");
    axios.post(url,{"client_id":auth.ClientID, "category_name":props.tableName, "name": name,"amount":amount}) // change the ID to the id if logged in user
    .then(displayTableData());

}

function editHandler(id){
    alert(id)
}

    return (
        <div>
            {/* {console.log("data from the backend:",data)} */}
            <Table className="tablealignment" striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th><h4><b>ID</b></h4></th>
                    <th><h4><b>Name</b></h4></th>
                    <th><h4><b>Amount</b></h4></th>
                    <th><h4><b>C-Date</b></h4></th>
                    <th><h4><b>U-Date</b></h4></th>
                    <th colSpan="2"><h4><b>Action</b></h4></th>
                    </tr>
                </thead>
                <tbody>
                {data.map( (row, i) =>
                <tr key={i}>
                    <td><h5>{i+1}</h5></td>
                    <td><h5>{row.name}</h5></td>
                    <td><h5>{row.amount}</h5></td>
                    <td><h5>{row.created_at.substring(0, 10)}<br/>{row.created_at.substring(12, 16)}</h5></td>
                    <td><h5>{row.updated_at.substring(0, 10)}<br/>{row.updated_at.substring(12, 16)}</h5></td>
                    <td><Button onClick={()=>{editHandler(row.id)}} variant="light">Edit</Button></td>
                    <td><Button onClick={()=>{deleteHandler(row.id)}} variant="light">Delete</Button></td>
                </tr>)}

                <tr key={index+1}>
                    <td><input type="text" placeholder={index+1} disabled /></td>
                    <td><input type="text" placeholder="name" onChange={(e)=>{setnameInput(e.target.value)}}/></td>
                    <td><input type="text" placeholder="amount" onChange={(e)=>{setAmountInput(e.target.value)}}/></td>
                    <td><input type="text" placeholder="date created" disabled /></td>
                    <td><input type="text" placeholder="date updated" disabled/></td>
                    
                    <td colSpan="2"><Button onClick={()=>{createHandler(nameInput,amountInput)}} variant="light">Add New Exp</Button></td>
                </tr>
                </tbody>
            </Table>

            
        </div>
    )
}
