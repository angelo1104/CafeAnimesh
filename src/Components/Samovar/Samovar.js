import React, {useEffect, useState} from "react";
import './Samovar.css';
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import {database} from "../../firebase";
import {useStateValue} from "../../StateProvider";
import {useHistory} from 'react-router-dom';

function Samovar() {
    const history = useHistory()
    const [html,setHtml] = useState([])

    const [{user}] = useStateValue();

    useEffect(()=>{
        if (!user) history.replace('/')
    },[user,history])

    useEffect(()=>{
        const unsubscribeSamovar = database.collection('Samovar')
            .orderBy('timestamp','desc')
            .limit(1)
            .onSnapshot(snapshot => {
                setHtml(snapshot.docs.map(doc=>{
                    return {
                        html: doc.data().html
                    }
                }))
            })

        return()=>{
            unsubscribeSamovar()
        }
    },[])

    useEffect(()=>{
        const main = document.querySelector('.main#samovar')

        if (html[0]?.html){
            main.innerHTML = html[0]?.html
        }else {
            main.innerHTML = '<p>There are no samovars yet.</p>'
        }
    },[html])

    return (
        <div className="samovar">
            <Header/>
            <Banner title={'Brewing the perfect tea'} imageUrl={'http://cafeanimesh.weebly.com/files/theme/images/bg-light.jpg?1592320655'}/>

            <div className="main" id={'samovar'}>
                jgjgjgj
            </div>
        </div>
    )
}

export default Samovar;