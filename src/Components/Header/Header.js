import React from "react";
import './Header.css'
import {Link} from 'react-router-dom'

function Header() {
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
                <Link className='header-link' to='/class'>
                    <p>Class</p>
                </Link>
                <Link className='header-link' to='/assignments'>
                    <p>Assignments</p>
                </Link>
                <Link className='header-link' to='/feedback'>
                    <p>Feedback</p>
                </Link>
            </div>
        </header>
    )
}


export default Header