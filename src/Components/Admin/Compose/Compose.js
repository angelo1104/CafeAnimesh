 import React, {useState} from 'react';
 import './Compose.css'
 import { Editor } from '@tinymce/tinymce-react';

 function Compose() {
     const [personOfTheWeek,setPersonOfTheWeek] = useState('')

     const handleEditorChange = (content,editor)=>{
         setPersonOfTheWeek(content);
     }

     return (
         <div className="compose">
             <Editor
                 apiKey="kt05vov950skrvbh3p17lldel39wlt96758sq5rmbkk5wq27"
                 initialValue="<p>Person of the week.</p>"
                 init={{
                     width: 1200,
                     height: 500,
                     menubar: false,
                     plugins: [
                         'advlist autolink lists link image charmap print preview anchor',
                         'searchreplace visualblocks code fullscreen',
                         'insertdatetime media table paste code help wordcount'
                     ],
                     toolbar://eslint-disable-next-line
                         'undo redo | formatselect | bold italic backcolor | \
                         alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent | removeformat | help'
                 }}
                 onEditorChange={handleEditorChange}
             />
         </div>
     );
 }

 export default Compose;
