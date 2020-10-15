import React, {useState} from "react";
import './MonthlyReview.css';
import DropDown from "../DropDown/DropDown";
import {Button} from "@material-ui/core";
import {database} from "../../../firebase";

function MonthlyReview() {
    const [selected,setSelected] = useState('very satisfied')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [comment,setComment] = useState('')
    const [month,setMonth] = useState('January')
    const [message,setMessage] = useState('')

    const submitFeedback = (e)=>{
        database.collection('monthly review')
            .add({
                comment: comment,
                firstName: firstName,
                lastName: lastName,
                feeling: selected,
                month: month
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
        <div className="monthly-review">
            <div className="review-heading">
                <h2>Monthly Lecture <br/> FeedBack</h2>
                <p className={'info'}>Please express your views on the quality of lectures for the past month and suggest ways to</p>
                <p className={'info'}>improve it further.</p>

                <DropDown value={selected} setValue={setSelected} menu={['very satisfied','satisfied',"can't say",'unsatisfied','very unsatisfied']} label={'Feeling'}/>
                <DropDown value={month} setValue={setMonth} menu={['January','February','March','April','May','June','July','August','September','October','November','December']} label={'Month'}/>

                <p className="dropdown-label">Comment</p>
                <textarea rows={6} value={comment} onChange={e=>setComment(e.target.value)}>

                </textarea>

                <div className="name">
                    <div className="first-name">
                        <p className="dropdown-label">First name</p>
                        <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)}/>
                    </div>

                    <div className="last-name">
                        <p className="dropdown-label">Last name</p>
                        <input type="text"  value={lastName} onChange={e=>setLastName(e.target.value)}/>
                    </div>
                </div>

                <Button className={'submit-button-review'} onClick={submitFeedback}>Submit</Button>
                { message && <p className="error-review">{message}</p>}
            </div>
        </div>
    )
}

export default MonthlyReview;