import React from "react";
import './GoTo.css';
import {Link} from "react-router-dom";

function GoTo({url,displayText}) {
    return(
        <Link to={`/${url}`} className={'goto-link'}>
            <div className="goto">
                <p>{displayText}</p>
            </div>
        </Link>
    )
}

export default GoTo;