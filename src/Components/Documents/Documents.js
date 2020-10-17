import React, {useEffect, useState} from "react";
import './Documents.css';
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Resources from "./Resources/Resources";
import {database} from "../../firebase";
import {useHistory} from 'react-router-dom';
import {useStateValue} from "../../StateProvider";

function Documents() {
    const [documents,setDocuments] = useState([])

    const history = useHistory()

    const [{user}] = useStateValue()

    useEffect(()=>{
        if (!user) history.replace('/')
    },[user,history])

    useEffect(()=>{
        database.collection('documents')
            .onSnapshot(snapshot => {
                setDocuments(snapshot.docs.map(file=>{
                    return{
                        id: file.id,
                        title: file.data().title
                    }
                }))
            })
    })

    return(
        <div className="documents">
            <Header/>

            <Banner imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'}/>
            <div className="main-documents">
                <h2><span className='documents-bold'>Repository :</span> textbooks,articles,presentations,images,etc.</h2>

                <div className="resources-section">
                    {
                        documents?.map((file,i)=>(
                            <Resources key={file?.id} title={file?.title} id={file?.id}/>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Documents;