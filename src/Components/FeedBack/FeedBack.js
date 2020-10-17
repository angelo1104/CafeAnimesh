import React, {useEffect} from "react";
import './FeedBack.css'
import Header from "../Header/Header";
import WeeklyReview from "./WeeklyReview/WeeklyReview";
import MonthlyReview from "./MonthlyReview/MonthlyReview";
import {useHistory} from 'react-router-dom';
import {useStateValue} from "../../StateProvider";

function FeedBack() {

    const history = useHistory();
    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        if (!user) history.replace('/')
    },[user,history])

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