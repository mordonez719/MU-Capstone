/*

Login.jsx

Displayes login form. Stores username in state variable.
searches for given username and tests if given password matches.

Calls: Signup
Called In: App

*/

import './Login.css'
import Signup from './Signup'
import { useState } from 'react'

function Login(props) {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState("")
    const [signup, setSignup] = useState(false)

    const handleTypeChange = (e) => {
        setSignup(!signup)
    }

    const handleChangeUser = (e) => {
        setUser(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
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
                props.setUser(user); // sets user on login
            }
            else{
                setResult("failed to find matching account")
            }
        })
        .catch(error => {
            setResult("failed to find matching account")
        });
    }

    return (!signup) ? (
        <div id="login-screen">
        <section id="login-block">
            <h2 className='login-title'>HealthHub</h2>
            <span className="material-symbols-outlined" id="person-icon">person</span>
            <br></br>
            <p id="intro">Welcome Back!</p>
            <div className="input-group">
                <label for="username">Username</label>
                <input className="login-input" name="username" onChange={handleChangeUser} value={user}></input>
            </div>
            <div className="input-group">
                <label for="password">Password</label>
                <input className="login-input" name="password" type="password" onChange={handleChangePassword} value={password}></input>
            </div>
            <p className="change-type" onClick={handleTypeChange}>Create a new account</p>
            <span>
                <button className="login-button" onClick={handleLogIn}>Log In</button>
            </span>
            <div>
                {result && <p>{result}</p>}
            </div>
        </section>
        </div>)
        : <Signup user={props.user} setUser={props.setUser} handleTypeChange={handleTypeChange}/>
}

export default Login