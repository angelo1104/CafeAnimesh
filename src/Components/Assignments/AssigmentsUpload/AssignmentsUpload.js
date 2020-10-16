import React, {useEffect, useState} from "react";
import './AssignmentsUpload.css';
import {Button} from "@material-ui/core";

function AssignmentsUpload() {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const handleFileChange = (e)=>{
        console.log(e.target.files)
    }


    return (
        <div className="assignments-upload">
            <div className="review-heading">
               <h2>Submit your <br/> assignments here...</h2>

                <p className="dropdown-label">Name</p>
                <div className="name">
                    <div className="first-name">
                        <input type="text" placeholder={'First'} value={firstName} onChange={e=>setFirstName(e.target.value)}/>
                    </div>

                    <div className="last-name">
                        <input type="text" placeholder={'Last'} value={lastName} onChange={e=>setLastName(e.target.value)}/>
                    </div>
                </div>

                <p className="dropdown-label">Email</p>
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>

                <p className="dropdown-label">Upload Files</p>
                <input type="file" className={'file-upload-input'} onChange={handleFileChange}/>

                <Button className={'submit-button-assignments'}>Submit</Button>
            </div>
        </div>
    )
}

export default AssignmentsUpload;