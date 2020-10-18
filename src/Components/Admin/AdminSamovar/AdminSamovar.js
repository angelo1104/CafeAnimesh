import React, {useEffect} from "react";
import './AdminSamovar.css'
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import Compose from "../Compose/Compose";
import {useHistory} from "react-router-dom";
import {useStateValue} from "../../../StateProvider";

function AdminSamovar() {
    const history = useHistory()

    const [{user,userType}] = useStateValue();

    useEffect(()=>{
        if (!user) history.replace('/')
        else if (userType!=='admin') history.replace('/home')
    },[history,user,userType])

    return (
        <div className="admin-samovar">
            <Header/>
            <Banner title={"Let's get brewin'"} imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'}/>

            <Compose type={'Samovar'}/>
        </div>
    )
}

export default AdminSamovar;