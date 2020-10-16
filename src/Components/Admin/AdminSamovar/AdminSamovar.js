import React from "react";
import './AdminSamovar.css'
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import Compose from "../Compose/Compose";

function AdminSamovar() {
    return (
        <div className="admin-samovar">
            <Header/>
            <Banner title={"Let's get brewin'"} imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'}/>

            <Compose type={'Samovar'}/>
        </div>
    )
}

export default AdminSamovar;