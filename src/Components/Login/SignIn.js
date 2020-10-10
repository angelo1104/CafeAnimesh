import React, {useEffect, useState} from "react";
import './SignIn.css'
import {auth} from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import {useStateValue} from "../../StateProvider";

function SignIn() {
    const history = useHistory()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        if (user){
            history.replace('/home')
        }
    },[user,history])

    const signIn = (event)=>{
        event.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
            .then(authUser=>{
                history.push('/home')
            })
            .catch(err=>{
                alert(err.message)
            })
    }

    return(
        <div className="signin">
            <form onSubmit={signIn}>
                <input value={email}  onChange={e=> setEmail(e.target.value)} className='login-input' type="email" placeholder='Your email' />
                <input value={password} onChange={e=> setPassword(e.target.value)} className='login-input' type="password" placeholder='Your password' />

                <button className='signup-button' type="submit">Sign In</button>

                <h4>
                    Haven't got an account? <Link className='sign-in-link' to={'/'}>Sign Up</Link>
                </h4>
            </form>
        </div>
    )
}

export default SignIn