import React from "react";
import './MonthlyReview.css';
import DropDown from "../DropDown/DropDown";

function MonthlyReview() {
    return (
        <div className="monthly-review">
            <div className="review-heading">
                <h2>Monthly Lecture <br/> FeedBack</h2>
                <p className={'info'}>Please express your views on the quality of lectures for the past month and suggest ways to</p>
                <p className={'info'}>improve it further.</p>

                <DropDown menu={['very satisfied','less satisfied']} label={'Feeling'}/>
                <DropDown menu={['January','February','March','April','May','June','July','August','September','October','November','December']} label={'Month'}/>

                <p className="dropdown-label">Comment</p>
                <textarea rows={6}></textarea>

                <div className="name">
                    <div className="first-name">
                        <p className="dropdown-label">First name</p>
                        <input type="text" />
                    </div>

                    <div className="last-name">
                        <p className="dropdown-label">Last name</p>
                        <input type="text"  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyReview;