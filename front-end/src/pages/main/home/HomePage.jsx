/*

HomePage.jsx

Sets up the display of workouts and meal plans libraries.
Create workout button opens a form for the user to enter a
name and description for an empty workout to be displayed.

Calls: AllMealPlans, AllWorkouts, CreatePlan, CreateWorkout, FriendsWorkouts, FriendsPlans, Recommendations
Called In: MainPage

*/

import './HomePage.css'
import AllMealPlans from './components/AllMealPlans'
import AllWorkouts from './components/AllWorkouts'
import CreateWorkout from './components/CreateWorkout';
import CreatePlan from './components/CreatePlan.jsx'
import FriendsWorkouts from './components/FriendsWorkouts.jsx'
import FriendsPlans from './components/FriendsPlans.jsx';
import Recommendations from './components/Recommend/Recommendations.jsx';
import { useState, useEffect } from 'react';

function HomePage(props) {
    // useState determines if the creation forms should be visible
    const [form, setForm] = useState(0);
    const [mealForm, setMealForm] = useState(0);
    const [friends, setFriends] = useState([]);
    const [friendsNames, setFriendsNames] = useState([]);

    // fetches all users associated with the current user and populates the lists
    const fetchFriendData = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/friendlist`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setFriends(data.friends);
        setFriendsNames( // turns the list of user models into a list of their usernames for fetching workouts and plans
            friends.map((friend) => {
                return (
                  friend.user
                )
                })
        )
    };

    useEffect(() => {
        fetchFriendData();
    })

    return (
        <div id="home-content">
            <div className="home-menu">
                <h3 className='home-header'>Recommended For You: </h3>
            </div>
            <Recommendations user={props.user} searchChange={props.searchChange}/>
            <br></br>
            <div className="home-menu">
                <h3 className='home-header'>Your Workouts: </h3>
                <button className="create" onClick={() => setForm(1)}>Create a Workout</button>
            </div>
            <AllWorkouts user={props.user}/>
            <CreateWorkout user={props.user} form={form} setForm={setForm}/>
            <br></br>
            <div className="home-menu">
                <h3 className='home-header'>Your Meal Plans: </h3>
                <button className="create" onClick={() => setMealForm(1)}>Create a Meal Plan</button>
            </div>
            <AllMealPlans user={props.user}/>
            <CreatePlan user={props.user} form={mealForm} setForm={setMealForm}/>
            <br></br>
            <div className="home-menu">
                <h3 className='home-header'>Your Friends' Workouts: </h3>
            </div>
            <FriendsWorkouts user={props.user} friends={friendsNames}/>
            <br></br>
            <div className="home-menu">
                <h3 className='home-header'>Your Friends' Meal Plans: </h3>
            </div>
            <FriendsPlans user={props.user} friends={friendsNames}/>
        </div>
    )
}

export default HomePage

