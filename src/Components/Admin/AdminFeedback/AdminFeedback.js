import React, {useEffect, useState} from "react";
import './AdminFeedback.css'
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import FeedBack from "./FeedBack/FeedBack";
import {database} from "../../../firebase";
import {useHistory} from 'react-router-dom';
import {useStateValue} from "../../../StateProvider";
import axios from "../../../axios";
import fileDownload from "js-file-download";

function AdminFeedBack() {
    const history = useHistory()

    const [{user,userType}] = useStateValue();

    useEffect(()=>{
        if (!user) history.replace('/')
        else if (userType!=='admin') history.replace('/home')
    },[history,user,userType])

    const [weeklyReviews,setWeeklyReviews] = useState([])
    const [monthlyReviews,setMonthlyReviews] = useState([])

    useEffect(()=>{
        database.collection('weekly review')
            .onSnapshot(snapshot => {
                setWeeklyReviews(snapshot.docs.map(review=>{
                    return {
                        id: review.id,
                        firstName: review.data().firstName,
                        lastName: review.data().lastName,
                        feeling: review.data().feeling,
                        comment: review.data().comment
                    }
                }))
            })
    },[])

    useEffect(()=>{
        database.collection('monthly review')
            .onSnapshot(snapshot => {
                setMonthlyReviews(snapshot.docs.map(review=>({
                    id: review.id,
                    firstName: review.data().firstName,
                    lastName: review.data().lastName,
                    comment: review.data().comment,
                    feeling: review.data().feeling,
                    month: review.data().month
                })))
            })
    },[])

    const getMonthlyReviewDownload = ()=>{
        axios.get('/feedback/monthly')
            .then(res=>{
                console.log(res)

                fileDownload(res.data,'monthlyReview.csv')
            })
            .catch(error=>{
                console.log(error)
            })
    }

    const getWeeklyReviewDownload = ()=>{
        axios.get('/feedback/weekly')
            .then(res=>{
                console.log(res)

                fileDownload(res.data,'weeklyReview.csv')
            })
            .catch(error=>{
                console.log(error)
            })
    }

    return (
        <div className="admin-feedback">
            <Header />
            <Banner imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'} title={'Check out'}/>
            <div className="review-heading">
                <div className="monthly-reviews">
                    <h2 className={'title'}>Monthly Reviews <span onClick={getMonthlyReviewDownload} className="review-download">(Download)</span></h2>
                    {
                        monthlyReviews.map(review=>{
                            return (
                                <FeedBack firstName={review.firstName}
                                          lastName={review.lastName}
                                          comment={review.comment}
                                          feeling={review.feeling}
                                          monthName={review.month}
                                          key={review.id}/>
                            )
                        })
                    }
                </div>

                <div className="weekly-reviews">
                    <h2 className={'title'}>Weekly Reviews <span onClick={getWeeklyReviewDownload} className="review-download">(Download)</span></h2>
                    {
                        weeklyReviews.map(review=>{
                            return (
                                <FeedBack firstName={review.firstName}
                                          lastName={review.lastName}
                                          comment={review.comment}
                                          feeling={review.feeling}
                                          key={review.id}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminFeedBack;