import React, {useEffect, useState} from "react";
import './OfTheWeek.css'
import {database} from "../../firebase";
import {Button, Input} from "@material-ui/core";
import {useStateValue} from "../../StateProvider";

function OfTheWeek({type}) {
    const [documents,setDocuments] = useState([])
    const [comment,setComment] = useState('')
    const [comments,setComments] = useState([])
    const [commentCount,setCommentCount] = useState(0)

    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue()

    useEffect( ()=>{

        const unsubscribeDocuments = database.collection(type)
            .orderBy('timestamp','desc')
            .limit(1)
            .onSnapshot(snapshot => {
               const docs = snapshot.docs.map(doc=>{
                   return {
                       data: doc.data(),
                       id: doc.id,
                   }
               })
                setDocuments(docs)

                database.collection(type)
                    .doc(docs[docs?.length-1]?.id)
                    .collection('comments')
                    .onSnapshot(snapshot=>{
                        const arrayOfComments = snapshot.docs.map(doc=>{
                            return <p key={doc.id} className="comment"> <span key={doc.id} className="username">{doc.data().username}</span>{doc.data().text}</p>
                        })

                        setCommentCount(arrayOfComments.length)
                        setComments(arrayOfComments)
                    })
            })

        return()=>{
            unsubscribeDocuments()
        }
    },[type,comments,documents])

    useEffect(()=>{
        try {
            let html = documents[documents.length - 1]?.data?.html;
            // let localDate = documents[documents.length-1]?.data?.timestamp;
            // setDate(format(localDate, 'MM/dd/yyyy'))
            if (documents[documents.length - 1]?.data?.html === undefined) html='There are no posts'
            document.querySelector(`.main#${type}`).innerHTML = html
        }catch (e) {
            console.log(e)
        }
    },[documents, type])

    useEffect(()=>{
        try {

        }catch (e) {
            console.log(e)
        }

    },[documents,type])

    const postComment = (event)=>{
        event.preventDefault()

        setComment('')

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
                <p>{documents[documents.length-1]?.data?.timestamp} <span className='comments-count'>{commentCount} {commentCount===1 ? 'comment':'comments'}</span></p>
            </div>
            <h2>{type} of the Week</h2>

            <div className="main" id={type}>

            </div>

            <form className='comment-form' onSubmit={postComment}>
                <div className="comments">
                    {
                        comments?.map(doc=>{
                            return doc;
                        })
                    }
                </div>
                <Input className='comment-input' value={comment} onChange={e => setComment(e.target.value)} placeholder='Add a comment...'/>
                <Button className='comment-button' type='submit'>Post</Button>
            </form>
        </div>
    )
}

export default OfTheWeek