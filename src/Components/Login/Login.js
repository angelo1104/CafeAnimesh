import React, {useEffect, useState} from "react";
import './Login.css'
import {auth} from "../../firebase";
import {useHistory} from 'react-router-dom'
import {useStateValue} from "../../StateProvider";

function Login() {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue()

    const history = useHistory()

    useEffect(()=>{
        console.log(user)
    },[user])

    const signUp = (event)=>{
        event.preventDefault()

        auth.createUserWithEmailAndPassword(email,password)
            .then(authUser=>{
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })

                history.push('/home')
            })
            .catch(err=>{
                alert(err.message)
            })
    }

    return (
        <div className="login">
            <form onSubmit={signUp}>
                <input value={username} onChange={e=> setUsername(e.target.value)} className='login-input' type="text" placeholder='Your username' />
                <input value={email}  onChange={e=> setEmail(e.target.value)} className='login-input' type="email" placeholder='Your email' />
                <input value={password} onChange={e=> setPassword(e.target.value)} className='login-input' type="password" placeholder='Your password' />

                <button className='signup-button' type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Login