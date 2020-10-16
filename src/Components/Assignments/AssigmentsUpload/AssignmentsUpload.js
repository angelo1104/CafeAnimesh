import React from "react";
import './AssignmentsUpload.css';

function AssignmentsUpload() {
    return (
        <div className="assignments-upload">
            <div className="review-heading">
               <h2>Submit your <br/> assignments here...</h2>

                <p className="dropdown-label">Name</p>
                <div className="name">
                    <div className="first-name">
                        <input type="text" placeholder={'First'}/>
                    </div>

                    <div className="last-name">
                        <input type="text" placeholder={'Last'}/>
                    </div>
                </div>

                <p className="dropdown-label">Email</p>
                <input type="text" />

                <p className="dropdown-label">Upload Files</p>
                <input type="file" className={'file-upload-input'}/>
            </div>
        </div>
    )
}

export default AssignmentsUpload;