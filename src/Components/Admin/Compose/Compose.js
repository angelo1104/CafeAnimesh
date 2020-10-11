 import React, {useState} from 'react';
 import './Compose.css'
 import { Editor } from '@tinymce/tinymce-react';
 import {Button} from "@material-ui/core";
 import {database} from "../../../firebase";
 import {formatter} from "../../../constants";

 function Compose({type,collectionName}) {
     const [personOfTheWeekText,setPersonOfTheWeekText] = useState(`<p>${type} of the week.<p/>`)
     const [message,setMessage] = useState(null)
     const [error,setError] = useState('error')

     const handleEditorChange = (content,editor)=>{
         setPersonOfTheWeekText(content);
     }

     const submitPost = (event)=>{
         event.preventDefault()

        database.collection(type)
            .add({
                html: personOfTheWeekText,
                timestamp: formatter.format(new Date())
            })
            .then(res=>{
                console.log('Success',res)
                setMessage(`${type} of the week is successfully updated.`)
                setPersonOfTheWeekText(`<p>${type} of the week.<p/>`)
                setError('success')
            })
            .catch(err=>{
                setMessage('There is an error .Please try again.')
                setError('error')
                console.log('Error',err)
            })

     }

     return (
         <div className="compose">
             <h2 className='special'>{type} of the week</h2>

             <Editor
                 apiKey="kt05vov950skrvbh3p17lldel39wlt96758sq5rmbkk5wq27"
                 value={personOfTheWeekText}
                 plugins={['autoresize']}
                 init={{
                     height: 500,
                     menubar: false,
                     plugins: [
                         'advlist autolink lists link image charmap print preview anchor',
                         'searchreplace visualblocks code fullscreen',
                         'insertdatetime media table paste code help wordcount'
                     ],
                     toolbar://eslint-disable-next-line
                         'undo redo | formatselect | bold italic backcolor link | \
                         media image mentions emoticons| alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent | removeformat | wordcount | help'
                 }}
                 onEditorChange={handleEditorChange}
             />

             {message && <p className={`error-success ${error}`}>{message}</p>}

             <Button className='compose-button' onClick={submitPost}>Submit</Button>
         </div>
     );
 }

 export default Compose;
