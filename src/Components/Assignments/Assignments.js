import React, {useEffect} from "react";
import './Assignments.css'
import Header from "../Header/Header";
import Disclaimer from "./Disclaimer";
import AssignmentsUpload from "./AssigmentsUpload/AssignmentsUpload";
import {useHistory} from 'react-router-dom';
import {useStateValue} from "../../StateProvider";

function Assignments() {
    const history = useHistory();

    const [{user}] = useStateValue();

    useEffect(()=>{
        if (!user) history.replace('/')
    },[user,history])

    return (
        <div className="assignments">
           <Header />

           <div className="review-heading">
               <Disclaimer/>
               <AssignmentsUpload/>
           </div>
        </div>
    )
}

export default Assignments;