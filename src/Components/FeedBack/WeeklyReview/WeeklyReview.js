import React, {useState} from "react";
import './WeeklyReview.css'
import DropDown from "../DropDown/DropDown";

function WeeklyReview() {
    const [comment,setComment] = useState('')

    return (
        <div className="weeklyReview">
            <div className="review-heading">
                <h2>Weekly Lecture <br/> Feedback</h2>
                <p>Please indicate your overall feeling about the lectures of the past week;</p>
                <p>please, include a short comment also.</p>

                <DropDown menu={['very satisfied','less satisfied']} label={'Feeling'}/>

                <p className="dropdown-label">Comment</p>
                <input type="text" value={comment} onChange={e=>setComment(e.target.value)} />

                <div className="name">
                    <div className="first-name">
                        <p className="dropdown-label">First name</p>
                        <input type="text" value={comment} onChange={e=>setComment(e.target.value)} />
                    </div>

                    <div className="last-name">
                        <p className="dropdown-label">Last name</p>
                        <input type="text" value={comment} onChange={e=>setComment(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyReview