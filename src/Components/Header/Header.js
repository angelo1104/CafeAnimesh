import React, {useEffect, useState} from "react";
import './Header.css'
import {Link,useLocation} from 'react-router-dom'
import {auth} from "../../firebase";
import {useStateValue} from "../../StateProvider";

function Header() {
    const location = useLocation();

    const signOut=(event)=>{
        auth.signOut()
    }

    const [amIAdmin,setAmIAdmin] = useState(false)

    //eslint-disable-next-line
    const [{userType},dispatch] = useStateValue()


    useEffect(()=>{
        if (location.pathname==='/admin'){
            setAmIAdmin(true)
        }
    },[location.pathname,setAmIAdmin])

    const goToConsole = ()=>{
        if (userType==='admin' && amIAdmin===false){
            return(
                <Link className='header-link' to='/admin'>
                    <p>Go to console</p>
                </Link>
            )
        }
    }

    return(
        <header className="header">
            <Link className='header-link' to='/home'>
                <h2>
                    Café Animesh!
                </h2>
            </Link>

            <div className="header-links">
                <Link className='header-link' to='/home'>
                    <p>Home</p>
                </Link>
                <Link className='header-link' to='/samovar'>
                    <p>Samovar</p>
                </Link>
                {userType!=='admin' && <Link className='header-link' to='/class/become-admin'>
                    <p>Become Admin</p>
                </Link>}
                <Link className='header-link' to='/assignments'>
                    <p>Assignments</p>
                </Link>
                <Link className='header-link' to='/documents'>
                    <p>Documents</p>
                </Link>
                <Link className='header-link' to='/feedback'>
                    <p>Feedback</p>
                </Link>

                <div className='header-link' onClick={signOut}>
                    <p>Sign Out</p>
                </div>

                {goToConsole()}
            </div>
        </header>
    )
}


export default Header