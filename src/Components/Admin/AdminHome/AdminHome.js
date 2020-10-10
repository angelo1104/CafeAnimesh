import React from "react";
import './AdminHome.css'
import Header from "../../Header/Header";
import Compose from "../Compose/Compose";

function AdminHome() {
    return (
        <div className="admin-home">
           <Header/>
           <div className="welcome">
               <h1 className="admin-welcome">
                   Hi ,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin
               </h1>
           </div>

            <Compose/>
        </div>
    )
}

export default AdminHome