import React,{useState, useEffect, useRef} from 'react';
import './DropZone.css'
import {database, storage} from "../../../../firebase";
import {Button} from "@material-ui/core";

const DropZone = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [validFiles, setValidFiles] = useState([]);
    const fileInputRef = useRef();
    const [resourceTitle,setResourceTitle] = useState('')

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
                setErrorMessage('File type not permitted');
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
        // find the index of the item
        // remove the item from array

        const validFileIndex = validFiles.findIndex(e => e.name === name);
        validFiles.splice(validFileIndex, 1);
        // update validFiles array
        setValidFiles([...validFiles]);
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

    const uploadFilesAsPromise = (file,path)=>{
        return new Promise(function (resolve, reject) {
            let storageRef = storage.ref(path);

            //Upload file
            let task = storageRef.put(file);

            //Update progress bar
            task.on('state_changed',
                function progress(snapshot){
                    let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    console.log(percentage)
                },
                function error(err){

                },
                function complete(){
                    let downloadURL = task.snapshot.downloadURL;
                    console.log(downloadURL)
                }
            );
        });
    }


    const uploadFiles = ()=>{
        console.log('clicked')

        database.collection('documents')
            .add({
                title: resourceTitle
            })
            .then(()=>{
                console.log('created collection in db')
            })
            .catch(err=>{
                console.log(err)
            })

        selectedFiles.forEach((file,i)=>{
            uploadFilesAsPromise(file,`resources/${resourceTitle}/${file.name}`)
                .then(res=>{
                    console.log(res)
                })
        })

        // selectedFiles.forEach((file,i)=>{
        //     console.log(file.name)
        //     const uploadTask = storage.ref('files/image').put(selectedFiles[0])
        //
        //     uploadTask.on('state_changed',(snapshot)=>{
        //         console.log(snapshot.bytesTransferred/snapshot.totalBytes*100)
        //
        //     },(error)=>{
        //         console.log(error)
        //     },()=>{
        //         storage.ref('files/image').getDownloadURL()
        //             .then(url=>{
        //                 console.log(url)
        //             })
        //     })
        // })

    }


    useEffect(() => {
        let filteredArray = selectedFiles.reduce((file, current) => {
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            } else {
                return file;
            }
        }, []);
        setValidFiles([...filteredArray]);

    }, [selectedFiles]);


    return (
        <>
            <Button className="file-upload-btn" onClick={uploadFiles}>Upload Files</Button>
            <input className={'resource-title'} value={resourceTitle} onChange={e => setResourceTitle(e.target.value)} type="text" placeholder={'Resource Title'}/>
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
                        validFiles.map((data, i) =>
                            <div className="file-status-bar" key={i}>
                                <div>
                                    <div className="file-type-logo"></div>
                                    <div className="file-type">{fileType(data.name)}</div>
                                    <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                    <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
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