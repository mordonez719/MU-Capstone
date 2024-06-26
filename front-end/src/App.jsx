import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/login/Login'
import MainPage from './pages/main/MainPage'

function App() {
  const [user, setUser] = useState("")

  return (
    <BrowserRouter>
    <div id="main-content-holder">
      <main>
        <Routes>
          <Route path="/" element={user ? <MainPage user={user}/> : <Login setUser={setUser}/>} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

export default App
