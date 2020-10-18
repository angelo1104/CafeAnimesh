import React, {useEffect, useState} from "react";
import './Login.css'
import {auth, database} from "../../firebase";
import {Link, useHistory} from 'react-router-dom'
import {useStateValue} from "../../StateProvider";

function Login() {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue()

    const history = useHistory()

    useEffect(()=>{
        if (user){
            history.replace('/home')
        }
    },[user,history])

    const signUp = (event)=>{
        event.preventDefault()

        auth.createUserWithEmailAndPassword(email,password)
            .then(authUser=>{
                let userType = 'user'
                if (email==='madhav_anand@outlook.com') userType='admin'
                database.collection('users')
                    .doc(email)
                    .set({
                        userType: userType,
                        email: email
                    })
                    .then(res=>{
                      console.log('Successfully added user to db')
                    })
                    .catch(err=>{
                        console.log('Error in adding user to db',err)
                    })

                auth.currentUser.updateProfile({
                    displayName: username
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

                <p className="terms">
                    By signing up you accept our terms and conditions.
                </p>

                <h4>
                    Got an account? <Link className='sign-in-link' to={'/accounts/emaillogin'}>Login</Link>
                </h4>
            </form>
        </div>
    )
}

export default Login