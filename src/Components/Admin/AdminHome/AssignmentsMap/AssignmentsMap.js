import React, {useEffect, useState} from "react";
import './AssignmentsMap.css';
import {database} from "../../../../firebase";

function AssignmentsMap() {
    const [assignments,setAssignments] = useState([])

    useEffect(()=>{
        const unsubscribeDocuments = database.collection('assignments')
            .onSnapshot(snapshot => {
                setAssignments(snapshot.docs.map(assignment=>({
                    firstName: assignment.data().firstName,
                    lastName: assignment.data().lastName,
                    getDownloadUrl: assignment.data().downloadUrl,
                    email: assignment.data().email,
                    fileName: assignment.data().fileName
                })))
            })

        return()=>{
            unsubscribeDocuments()
        }
    },[])

    function getExtension(path) {
        let basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
            // (supports `\\` and `/` separators)
            pos = basename.lastIndexOf(".");       // get last position of `.`

        if (basename === "" || pos < 1)            // if file name is empty or ...
            return "";                             //  `.` not found (-1) or comes first (0)

        return basename.slice(pos + 1);            // extract extension ignoring `.`
    }

    return (
        <div className="assignments-map">
            {
                assignments.map((i,index)=>(
                    <div className="main-assignments-map" key={index}>
                        <h2>{i.firstName} {i.lastName}</h2>
                        <h4>{i.email}</h4>

                        <div className="file-assignments">
                            <div className="file-logo-documents">
                                <div className="file-type-logo documents-file-logo"></div>
                                <div className="file-type">{getExtension(i.fileName)}</div>
                            </div>

                            <a href={i.getDownloadUrl} target={'_blank'} rel="noopener noreferrer">get</a>
                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default AssignmentsMap;