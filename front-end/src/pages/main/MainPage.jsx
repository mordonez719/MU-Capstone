/*

Main.jsx

Sets up header, content, and tabs. Header displayes the username
of the current user and allows the user to log out.
The main content displayed switches between the home, 
meals, and exercise pages depending on the active tab selected 
by the user.

Calls: HomePage, WorkoutsPage, MealsPage
Called In: App

*/

import './MainPage.css'
import HomePage from './home/HomePage';
import { useState } from 'react';
import WorkoutsPage from './workouts/WorkoutsPage';
import MealsPage from './meals/MealsPage';

function MainPage(props){
    const [tabState, setTab] = useState(0);
    
    // sets active tab based on what the user clicks
    const toggleTab = (page) => {
          setTab(page);
      }

    // calls logout path to destory session and reset the current user, signing the user out
    const handleLogOut = () => {
        props.setUser("");
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/logout`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
    }


    return(
        <div id="main">
        <header>
            <span id="head-content">
                <p id="profile-name">Logged in as: {props.user}</p>
                <p id="title">Capstone</p>
                <p id="logout-button" onClick={handleLogOut}> Logout </p>
            </span>
        </header>
        <main id="all-content"> {/* alters display--visible or not--depending on if the page is active */}
            <div className={tabState === 0 ? "content active-content" : "content"}>
                <HomePage user={props.user}/>
            </div>
            <div className={tabState === 1 ? "content active-content" : "content"}>
                <WorkoutsPage />
            </div>
            <div className={tabState === 2 ? "content active-content" : "content"}>
                <MealsPage />
            </div>
        </main>
        <footer> {/* alters display and toggles tab depening on if the tab is active */}
            <h4 className={tabState === 1 ? "tabs active-tabs" : "tabs"} onClick={()=> toggleTab(1)}>Workouts</h4>
            <h4 className={tabState === 0 ? "tabs active-tabs" : "tabs"} onClick={()=> toggleTab(0)}>Home</h4>
            <h4 className={tabState === 2 ? "tabs active-tabs" : "tabs"} onClick={()=> toggleTab(2)}>Meal Plans</h4>
        </footer>
        </div>
    )
}

export default MainPage