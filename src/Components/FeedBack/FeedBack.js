import React from "react";
import './FeedBack.css'
import Header from "../Header/Header";
import WeeklyReview from "./WeeklyReview/WeeklyReview";
import MonthlyReview from "./MonthlyReview/MonthlyReview";

function FeedBack() {

    return(
        <div className="feedback">
            <Header/>

            <div className="review">
                <WeeklyReview/>
                <MonthlyReview/>
            </div>
        </div>
    )
}

export default FeedBack;