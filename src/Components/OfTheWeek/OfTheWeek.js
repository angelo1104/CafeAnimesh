import React, {useEffect, useState} from "react";
import './OfTheWeek.css'
import {database} from "../../firebase";

function OfTheWeek({type}) {
    const [documents,setDocuments] = useState([])

    useEffect( ()=>{

        database.collection(type)
            .orderBy('timestamp')
            .onSnapshot(snapshot => {
               const docs = snapshot.docs.map(doc=>{
                   return  doc.data()
               })

                setDocuments(docs)
            })
    },[type])

    useEffect(()=>{
        try {
            let html = documents[documents.length - 1]?.html;
            if (documents[documents.length - 1]?.html === undefined) html='There are no posts'
            document.querySelector(`.main#${type}`).innerHTML = html
        }catch (e) {
            console.log(e)
        }
    },[documents, type])

    return(
        <div className="of-the-week">
            <div className="date">
                <p>27/12/18 <span className='comments-count'>O comments</span></p>
            </div>

            <h2>{type} of the Week</h2>

            <div className="main" id={type}>

            </div>
        </div>
    )
}

export default OfTheWeek