import React from "react";
import './AdminHome.css'
import Header from "../../Header/Header";
import Compose from "../Compose/Compose";
import {bookOfTheWeek, personOfTheWeek, wordOfTheWeek} from "../../../constants";

function AdminHome() {
    return (
        <div className="admin-home">
           <Header/>
           <div className="welcome">
               <h1 className="admin-welcome">
                   Hi ,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin
               </h1>
           </div>
            <h2 className='compose-title'>Compose</h2>
            <Compose type={'Person'} collectionName={personOfTheWeek}/>
            <hr className='separator'/>
            <Compose type={'Word'} collectionName={wordOfTheWeek}/>
            <hr className='separator'/>
            <Compose type={'Book'} collectionName={bookOfTheWeek}/>
        </div>
    )
}

export default AdminHome