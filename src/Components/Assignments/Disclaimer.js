import React from "react";
import './Disclaimer.css';

function Disclaimer() {
    return (
        <div className="disclaimer">
            <h2>File Upload <br/>guidelines...</h2>
            <p>Please be mindful of the file size limit for uploading.</p>
            <p>The name of the file to be uploaded must mention clearly the kind of assignment it is for. For example, if you are submitting a Classroom Reflection assignment, the file name may be as: "Reflection - your first name - week of - date", without the quotes. The first word of the file name must be intuitively indicative of the nature of the assignment.</p>
            <p>Illustrator: <span>Facebook Inc</span></p>
        </div>
    )
}

export default Disclaimer;