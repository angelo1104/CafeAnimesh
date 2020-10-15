import React from "react";
import './AssignmentsUpload.css';

function AssignmentsUpload() {
    return (
        <div className="assignments-upload">
            <div className="review-heading">
               <h2>Submit your <br/> assignments here...</h2>

                <div className="name">
                    <div className="first-name">
                        <p className="dropdown-label">First name</p>
                        <input type="text" />
                    </div>

                    <div className="last-name">
                        <p className="dropdown-label">Last name</p>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignmentsUpload;