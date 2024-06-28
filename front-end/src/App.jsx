import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/login/Login'
import MainPage from './pages/main/MainPage'

function App() {
  const [user, setUser] = useState("")
  const cookies = document.cookie;
  console.log(cookies);
  // const [user, setUser] = useState(() => {
  //   // Retrieve the user data from storage or set it to null if not found
  //   const storedUser = localStorage.getItem('user');
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });

  // const updateUser = (newUser) => {
  //   setUser(newUser);
  // };

  // useEffect(() => {
  //   // Save the user data to storage whenever the user state changes
  //   localStorage.setItem('user', JSON.stringify(user));
  // }, [user]);

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
