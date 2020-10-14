import React, {useEffect, useState} from "react";
import './Resources.css';
import {database} from "../../../firebase";

function Resources({title,id}) {
    const [files,setFiles]= useState([])

    function getExtension(path) {
        let basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
            // (supports `\\` and `/` separators)
            pos = basename.lastIndexOf(".");       // get last position of `.`

        if (basename === "" || pos < 1)            // if file name is empty or ...
            return "";                             //  `.` not found (-1) or comes first (0)

        return basename.slice(pos + 1);            // extract extension ignoring `.`
    }

    useEffect(()=>{
        database.collection('documents')
            .doc(id)
            .collection('files')
            .onSnapshot(snapshot=>{
                setFiles(snapshot.docs.map(file=>{
                    return {
                        id: file.id,
                        url: file.data().url,
                        name: file.data().name
                    }
                }))
            })
    })

    return(
        <div className="resources">
            <h3>{`${title}...`}</h3>

            {
                files.map(file=>(
                    <div className="files" key={file.id}>
                        <div className="file-logo-documents">
                            <div className="file-type-logo documents-file-logo"></div>
                            <div className="file-type">{getExtension(file.name)}</div>
                        </div>

                        <div className="file-main-documents">
                            <h4 className="file-name">{file.name}</h4>
                            <a href={file.url} target='_blank' rel="noopener noreferrer">Get File</a>
                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default Resources