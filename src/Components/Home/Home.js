import React, {useEffect} from "react";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import OfTheWeek from "../OfTheWeek/OfTheWeek";
import {useHistory} from 'react-router-dom'
import {useStateValue} from "../../StateProvider";
import {personOfTheWeek} from "../../constants";

function Home() {
    const history = useHistory()
    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue()

    useEffect(()=>{
        if (!user){
            history.replace('/')
        }
    },[user,history])

    return(
        <div className="home-js">
            <Header/>
            <Banner title='Café Animesh!' imageUrl='http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'/>
            <OfTheWeek type={'Person'} collectionName={personOfTheWeek}/>
        </div>
    )
}

export default Home