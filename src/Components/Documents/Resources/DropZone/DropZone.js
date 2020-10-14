import React,{useState, useRef} from 'react';
import './DropZone.css'
import {database, storage} from "../../../../firebase";
import {Button} from "@material-ui/core";
import {nanoid} from 'nanoid'

const DropZone = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const fileInputRef = useRef();
    const [resourceTitle,setResourceTitle] = useState('')
    const idOfDocument = resourceTitle+nanoid()
    const [progress,setProgress] = useState(0)

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                // add to an array so we can display the name of file
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            }
        }

    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        if (files.length) {
            handleFiles(files);
        }
    }

    const removeFile = (name) => {
        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        // update selectedFiles array
        setSelectedFiles([...selectedFiles]);
    }

    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }


    const uploadFiles = ()=>{
        console.log('clicked')
        setErrorMessage('')

        if (resourceTitle!==''){
            database.collection('documents')
                .doc(idOfDocument)
                .set({
                    title: resourceTitle
                })
                .then(()=>{
                    console.log('created collection in db')
                    selectedFiles.forEach((file,index)=>{
                        const uploadTask = storage.ref(`resources/${resourceTitle}/${file.name}${index}`).put(file);

                        uploadTask.on('state_changed',(snapshot)=>{
                            const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                            setProgress(uploadProgress)

                            console.log(uploadProgress)
                        },(error)=>{
                            console.log(error)
                        },()=>{
                            storage.ref(`resources/${resourceTitle}`)
                                .child(`${file.name}${index}`)
                                .getDownloadURL()
                                .then(url=>{
                                    console.log(url)
                                    database.collection('documents')
                                        .doc(idOfDocument)
                                        .collection('files')
                                        .add({
                                            name: file.name,
                                            url: url
                                        })
                                        .then(res=>{
                                            console.log('succesfully added urls to db')
                                        })
                                        .catch(err=>{
                                            console.log(err)
                                        })

                                })
                                .catch(error=>{
                                    console.log(error)
                                })
                        })
                    })

                })
                .catch(err=>{
                    console.log(err)
                })

            setSelectedFiles([])
            setResourceTitle('')
        }else {
            setErrorMessage('A title is required.')
        }

    }



    return (
        <>
            <Button className="file-upload-btn" onClick={uploadFiles}>Upload Files</Button>
            <progress value={progress}></progress>
            <p className="error file-error-message">{errorMessage}</p>
            <input className={'resource-title'} value={resourceTitle} onChange={e => {
                setResourceTitle(e.target.value)
            }} type="text" placeholder={'Resource Title'}/>
            <div className="container">
                <div className="drop-container"
                     onClick={fileInputClicked}
                     onDragOver={dragOver}
                     onDragEnter={dragEnter}
                     onDragLeave={dragLeave}
                     onDrop={fileDrop}>
                    <div className="drop-message">
                        <div className="upload-icon"></div>
                        Drag & Drop files here or click to upload
                    </div>
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />

                </div>
                <div className="file-display-container">
                    {
                        selectedFiles.map((data, i) =>
                            <div className="file-status-bar" key={i}>
                                <div>
                                    <div className="file-type-logo"></div>
                                    <div className="file-type">{fileType(data.name)}</div>
                                    <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                    <span className="file-size">({fileSize(data.size)})</span>
                                </div>
                                <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default DropZone;