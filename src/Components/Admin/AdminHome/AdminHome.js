import React, {useEffect} from "react";
import './AdminHome.css'
import Header from "../../Header/Header";
import Compose from "../Compose/Compose";
import {useStateValue} from "../../../StateProvider";
import {useHistory} from 'react-router-dom'
import GoTo from "../GoTo/GoTo";

function AdminHome() {
    const history = useHistory()
    //eslint-disable-next-line
    const [{user,userType},dispatch] = useStateValue()

    useEffect(()=>{
        if (!user){
            history.replace('/')
        }else if (userType === 'user'){
            history.replace('/home')
        }
    },[user,history,userType])

    if (userType === 'user'){
        return <div></div>
    }

    return (
        <div className="admin-home">
           <Header/>
           <div className="welcome">
               <h1 className="admin-welcome">
                   Hi ,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin
               </h1>
           </div>
            <div className="gotos">
                <GoTo/>
            </div>
            <h2 className='compose-title'>Compose</h2>
            <Compose type={'Person'}/>
            <hr className='separator'/>
            <Compose type={'Word'}/>
            <hr className='separator'/>
            <Compose type={'Book'}/>
        </div>
    )
}

export default AdminHome