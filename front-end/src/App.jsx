/*

App.jsx

Routes between Main or Login page depending on if a
user is currently signed in

Calls: MainPage, Login
Called In:

*/

import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import MainPage from './pages/main/MainPage'

function App() {
  const [user, setUser] = useState("")
  const cookies = document.cookie;

  return (
    <BrowserRouter>
    <div id="main-content-holder">
      <main>
        <Routes>
          <Route path="/" element={user ? <MainPage user={user} setUser={setUser}/> : <Login setUser={setUser}/>} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

export default App
