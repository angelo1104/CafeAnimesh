import React from "react";
import './GoTo.css';
import {Link} from "react-router-dom";

function GoTo() {
    return(
        <Link to={'/admin-docs'} className={'goto-link'}>
            <div className="goto">
                <p>Add some documents</p>
            </div>
        </Link>
    )
}

export default GoTo;