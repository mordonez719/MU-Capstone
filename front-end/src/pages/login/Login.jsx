/*

Login.jsx

Displayes login form. Stores username in state variable.
Sign up stores username and password in database. Log in
searches for given username and tests if given password matches.

Calls: 
Called In: App

*/

import './Login.css'
import { useState } from 'react'

function Login(props) {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState("")

    const handleChangeUser = (e) => {
        setUser(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    // encrypts password and add the username, password pair to the database
    const handleSignUp = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/create`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user,
                password,
            }),
        })
        .then(response => {
            if (response.ok) {
                setResult("sign up success!");
                props.setUser(user);
            }
            else{
                setResult("failed to create an account")
            }
        })
        .catch(error => {
            setResult("failed to create an account")
        });
    }

    // find username, tests if password matches encrypted password that was stored
    const handleLogIn = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user,
                password,
            }),
        })
        .then(response => {
            if (response.ok) {
                setResult("log in success!");
                props.setUser(user);
            }
            else{
                setResult("failed to find matching account")
            }
        })
        .catch(error => {
            setResult("failed to find matching account")
        });
    }

    return (
        <section id="login-block">
            <h2>Capstone Project</h2>
            <span className="material-symbols-outlined" id="person-icon">person</span>
            <br></br>
            <p id="intro">Log in or Sign Up to get started</p>
            <div>
                <input onChange={handleChangeUser} value={user} placeholder='Username...'></input>
            </div>
            <div>
                <input onChange={handleChangePassword} value={password} placeholder='Password...'></input>
            </div>
            <span>
                <button className="login-button" onClick={handleLogIn}>Log In</button>
                <button className="login-button" onClick={handleSignUp}>Sign Up</button>
            </span>
            <div>
                {result && <p>{result}</p>}
            </div>
        </section>
    )
}

export default Login