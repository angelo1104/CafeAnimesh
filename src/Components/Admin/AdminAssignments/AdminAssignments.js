import React, {useEffect} from "react";
import './AdminAssignments.css';
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import AssignmentsMap from "../AdminHome/AssignmentsMap/AssignmentsMap";
import {useHistory} from 'react-router-dom';
import {useStateValue} from "../../../StateProvider";

function AdminAssignments() {
    const history = useHistory()

    const [{user,userType}] = useStateValue();

    useEffect(()=>{
        if (!user) history.replace('/')
        else if (userType!=='admin') history.replace('/home')
    },[history,user,userType])


    return (
        <div className="admin-assignments">
            <Header />
            <Banner title={'Check the heat'} imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'}/>

            <AssignmentsMap />
        </div>
    )
}

export default AdminAssignments;