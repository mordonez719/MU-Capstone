/*

App.jsx

Routes between Main or Login page depending on if a
user is currently signed in

Calls: MainPage, Login
Called In:

*/

import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import MainPage from './pages/main/MainPage'

function App() {
  const [user, setUser] = useState("")

  // gets current user, sets user useState to either "" or a username
  const fetchProfile = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/profile`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
    const data = await response.json()
    setUser(data);
}

useEffect(() => {
  fetchProfile();
})

  return (
    <BrowserRouter>
    <div id="main-content-holder">
      <main>
        <Routes>
          {/* displays login or main page depending on user */}
          <Route path="/" element={user ? <MainPage user={user} setUser={setUser}/> : <Login setUser={setUser}/>} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

export default App
