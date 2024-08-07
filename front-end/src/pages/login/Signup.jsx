/*

Signup.jsx

Displayes signup form. Stores username in state variable.
Creates a new user in the databse. Hashes password and stores username and password.

Calls: 
Called In: Login

*/

import './Signup.css'
import { useState } from 'react'

function Signup(props) {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState("")

    const handleChangeUser = (e) => {
        setUser(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    // encrypts password and adds the username, password pair to the database
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
                props.setUser(user); // sets user on account creation
            }
            else{
                setResult("failed to create an account")
            }
        })
        .catch(error => {
            setResult("failed to create an account")
        });
    }

    return (
        <div id="signup-screen">
        <section id="login-block">
            <h2 className='login-title'>HealthHub</h2>
            <span className="material-symbols-outlined" id="person-icon">person</span>
            <br></br>
            <p id="intro">Sign Up to Get Started!</p>
            <div class="input-group">
                <label for="username">Username</label>
                <input className="login-input" name="username" onChange={handleChangeUser} value={user}></input>
            </div>
            <div class="input-group"> 
                <label for="password">Password</label>
                <input className="login-input" name="password" type="password" onChange={handleChangePassword} value={password}></input>
            </div>
            <p className="change-type" onClick={props.handleTypeChange}>Already have an account?</p>
            <span>
                <button className="login-button" onClick={handleSignUp}>Sign Up</button>
            </span>
            <div>
                {result && <p>{result}</p>}
            </div>
        </section>
        </div>
    )
}

export default Signup