import React , { useContext }from 'react'
import { AuthContext } from '../../../context/auth-context'
import Chart from '../../../shared/components/Chart/Chart'
export default function Dashboard() {

    const auth = useContext(AuthContext); 


    return (
        <div>
            Dashboard
            <Chart/>
        </div>
    )
}
