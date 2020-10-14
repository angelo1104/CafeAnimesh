import React from "react";
import './AdminDocs.css'
import Banner from "../../Banner/Banner";
import DropZone from "../../Documents/Resources/DropZone/DropZone";
import Header from "../../Header/Header";

function AdminDocs() {

    return(
        <div className="admin-docs">
            <Header/>
            <Banner title={'Cheat Sheets'} imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'} />
            <h3>Resources are where we get started.</h3>

            <div className="resource">
                <DropZone/>
            </div>
        </div>
    )
}

export default AdminDocs;