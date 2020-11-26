import React, {useState, useEffect, useContext} from 'react';
import {Bar} from 'react-chartjs-2'
import { AuthContext } from '../../../context/auth-context'
import Button from 'react-bootstrap/Button'

const axios = require('axios').default;
export default function Chart() {

    const auth = useContext(AuthContext);

    const [dataLabel, setDataLabel] = useState()
    const [dataValues, setDataValues] = useState()
   

    const [chartData, setChartData] = useState(
        // {
        //     labels:["first","second","third","fourth"],
        //     datasets:[
        //         {
        //             label:'Population',
        //             data:[234,2345,2345,344]
        //         }
        //         ],
        //     backgroundColor: '#AE7B7B'
        // }
    )
    // function setLables(data){
    //     let temp = [];
    //    Object.values(Object.values(data[0])[0]).map( (item) =>
    //     (temp.push(item.category_name)))
    //    return temp;
    // }

    // function setValues(data){
    //     let temp = [];
    //     Object.values(Object.values(data)[1])[0].map( (item) =>
    //     (temp.push(item.amount)))
    //    return temp;
    
    // }

    function setLables(data){
        let temp = [];
        data.map( (item)=> (temp.push(item.name)))
       return temp;
    }

    function setValues(data){
        let array = [];

        let temp = 0;
        // data.map( (item)=> ( item.get_expense_relation.map( i ) => temp += i.amount
            
        // ))
        data.forEach(element => {
            element.get_expense_relation.forEach(ele => {
                temp += ele.amount;
            });
            array.push(temp);
            temp = 0;
        });

       return array;
    
    }

    useEffect(() => 
    {
        const url = ("http://127.0.0.1:8000/api/categories/"+auth.ClientID);//categories
        axios.get(url).then(res => {
            // setData(res.data);
            setDataLabel(setLables(res.data));
            setDataValues(setValues(res.data));
            
            });
    }
    , []);


    return (
        <div>
        
            
            {/* {console.log(dataLabel)}
            {console.log(dataValues)} */}
            
            <Bar
            data={chartData}
            options={{ }} // maintainAspectRatio: false 
            
            />
            <Button variant="primary" onClick={
                ()=> 
                setChartData({
                    labels:dataLabel,
                    datasets:[
                        {
                            label:'Total Expense By Category',
                            data:dataValues
                        }
                        ],
                    backgroundColor: '#AE7B7B'
                })
            }>Show Expense Data</Button>
           
            
        </div>
    )
}
