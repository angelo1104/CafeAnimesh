import React, {useEffect, useState} from "react";
import './AssignmentsUpload.css';
import {Button} from "@material-ui/core";
import {database, storage} from "../../../firebase";
import {useStateValue} from "../../../StateProvider";
import {nanoid} from "nanoid";

function AssignmentsUpload() {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [files,setFiles] = useState(null)
//eslint-disable-next-line
    const [{user},dispatch] = useStateValue()

    const [uniqueID,setUniqueID] = useState('');

    useEffect(()=>{
        setUniqueID(user?.displayName + nanoid())
    },[user])


    const handleFileChange = (e)=>{
        if (e.target.files[0]){
            setFiles(e.target.files[0])
        }
    }

    function submitAssignments(event) {
        database.collection('assignments')
            .doc(`${uniqueID}`)
            .set({
                firstName: firstName,
                lastName: lastName,
                email: email,
            })
            .then(res=>{
                console.log('created db')

                const uploadTask = storage.ref(`assignments/${user.displayName}/${files.name}`).put(files)

                uploadTask.on('state_changed',(snapshot)=>{
                    const percentage = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes) *100)

                    console.log(percentage)
                },(error)=>{
                    console.log(error)
                },()=>{
                    console.log('added to storage')

                    storage.ref(`assignments/${user.displayName}`)
                        .child(`${files.name}`)
                        .getDownloadURL()
                        .then(url=>{
                            database.collection('assignments')
                                .doc(`${uniqueID}`)
                                .update({
                                    downloadUrl: url
                                })
                                .then(()=>{
                                    console.log('added url')
                                })
                                .catch((error)=>{
                                    console.log(error)
                                })
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                })
            })
            .catch(err=>{
                console.log(err)
            })
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

                <Button className={'submit-button-assignments'} onClick={submitAssignments}>Submit</Button>
            </div>
        </div>
    )
}

export default AssignmentsUpload;