import React, {useEffect, useState} from "react";
import './OfTheWeek.css'
import {database} from "../../firebase";
import {Button, Input} from "@material-ui/core";
import {useStateValue} from "../../StateProvider";
import {formatter} from "../../constants";

function OfTheWeek({type}) {
    const [documents,setDocuments] = useState([])
    const [comment,setComment] = useState('')
    const [comments,setComments] = useState([])

    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue()

    useEffect( ()=>{

        database.collection(type)
            .orderBy('timestamp')
            .onSnapshot(snapshot => {
               const docs = snapshot.docs.map(doc=>{
                   return {
                       data: doc.data(),
                       id: doc.id,
                       timestamp: formatter.format(new Date())
                   }
               })

                setDocuments(docs)
            })
    },[type])

    useEffect(()=>{
        try {
            let html = documents[documents.length - 1]?.data?.html;
            if (documents[documents.length - 1]?.data?.html === undefined) html='There are no posts'
            document.querySelector(`.main#${type}`).innerHTML = html
        }catch (e) {
            console.log(e)
        }
    },[documents, type])

    // useEffect(()=>{
    //     try {
    //
    //     }catch (e) {
    //         console.log(e)
    //     }
    //     database.collection(type)
    //         .doc(documents[documents.length-1]?.id)
    //         .collection('comments')
    //         .onSnapshot(snapshot=>{
    //             setComments(
    //                 snapshot.docs.map(doc=>{
    //                     return doc.data()
    //                 })
    //             )
    //         })
    // },[documents,type])

    const postComment = (event)=>{
        event.preventDefault()

        database.collection(type)
            .doc(documents[documents.length - 1]?.id)
            .collection('comments')
            .add({
                username: user.displayName,
                text: comment
            })
            .then(res=>{
                console.log('successfully added')
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return(
        <div className="of-the-week">
            <div className="date">
                <p>27/12/18 <span className='comments-count'>O comments</span></p>
            </div>

            <h2>{type} of the Week</h2>

            <div className="main" id={type}>

            </div>

            <form className='comment-form' onSubmit={postComment}>
                <div className="comments">
                    {comments.map(doc=>{
                        return doc;
                    })}
                    <p className="comment"> <span className="username">djt</span> Hi ,I am a comment.</p>
                </div>
                <Input className='comment-input' value={comment} onChange={e => setComment(e.target.value)} placeholder='Add a comment...'/>
                <Button className='comment-button' type='submit'>Post</Button>
            </form>
        </div>
    )
}

export default OfTheWeek