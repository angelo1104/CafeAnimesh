import React from "react";
import './Assignments.css'
import Header from "../Header/Header";
import Disclaimer from "./Disclaimer";
import AssignmentsUpload from "./AssigmentsUpload/AssignmentsUpload";

function Assignments() {
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