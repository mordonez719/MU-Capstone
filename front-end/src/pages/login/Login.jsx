import './Login.css'
import { useState } from 'react'
// import { FaUser } from "node_modules/react-icons/fa"

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
            // credentials: 'include'
        })
        .then(response => {
            console.log(response)
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
            // credentials: 'include'
        })
        .then(response => {
            // console.log(response)
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
            {/* <FaUser/> */}
            <br></br>
            {/* <br></br> */}
            <p id="intro">Log in or Sign Up to get started</p>
            <div>
                {/* <label>username: </label> */}
                <input onChange={handleChangeUser} value={user} placeholder='Username...'></input>
            </div>
            <div>
                {/* <label>password: </label> */}
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