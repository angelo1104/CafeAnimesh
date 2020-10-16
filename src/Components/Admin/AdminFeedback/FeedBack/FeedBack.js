import React from "react";
import './FeedBack.css'

function FeedBack({firstName,lastName,feeling,monthName, comment}) {
    return (
        <div className="feedback">
            <h2 className={'name'}>{firstName} {lastName} <span>{feeling && `(${feeling})`}</span></h2>

            {monthName && <p className="month-name">{monthName}</p>}
            <p>{comment}</p>
        </div>
    )
}

export default FeedBack;