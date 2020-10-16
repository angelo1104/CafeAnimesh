import React from "react";
import './AdminAssignments.css';
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import AssignmentsMap from "../AdminHome/AssignmentsMap/AssignmentsMap";

function AdminAssignments() {
    return (
        <div className="admin-assignments">
            <Header />
            <Banner title={'Check the heat'} imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'}/>

            <AssignmentsMap />
        </div>
    )
}

export default AdminAssignments;