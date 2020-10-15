import React, {useState} from "react";
import './WeeklyReview.css'
import DropDown from "../DropDown/DropDown";
import {Button} from "@material-ui/core";
import {database} from "../../../firebase";

function WeeklyReview() {
    const [comment,setComment] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [selected,setSelected] = useState('very satisfied')
    const [message,setMessage] = useState(null)

    const submitFeedback = (e)=>{
        database.collection('weekly review')
            .add({
                comment: comment,
                firstName: firstName,
                lastName: lastName,
                feeling: selected
            })
            .then(res=>{
                console.log('successfully added to db')
                setMessage('Your feedback is successfully submitted.')
            })
            .catch(err=>{
                console.log(err)
                setMessage('Sorry There is an error. PLease Try again later.')
            })
    }

    return (
        <div className="weeklyReview">
            <div className="review-heading">
                <h2>Weekly Lecture <br/> Feedback</h2>
                <p>Please indicate your overall feeling about the lectures of the past week;</p>
                <p>please, include a short comment also.</p>

                <DropDown value={selected} setValue={setSelected} menu={['very satisfied','satisfied',"can't say",'unsatisfied','very unsatisfied']} label={'Feeling'}/>

                <p className="dropdown-label">Comment</p>
                <input type="text" value={comment} onChange={e=>setComment(e.target.value)} />

                <div className="name">
                    <div className="first-name">
                        <p className="dropdown-label">First name</p>
                        <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} />
                    </div>

                    <div className="last-name">
                        <p className="dropdown-label">Last name</p>
                        <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} />
                    </div>
                </div>

                <Button onClick={submitFeedback} className='submit-button-review'>Submit</Button>
                { message && <p className="error-review">{message}</p>}
            </div>
        </div>
    )
}

export default WeeklyReview