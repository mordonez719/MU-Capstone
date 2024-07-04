/*

HomePage.jsx

Sets up the display of workouts and meal plans libraries.
Create workout button opens a form for the user to enter a
name and description for an empty workout to be displayed.

Calls: AllMealPlans, AllWorkouts, CreateWorkout
Called In: MainPage

*/

import './HomePage.css'
import AllMealPlans from './components/AllMealPlans'
import AllWorkouts from './components/AllWorkouts'
import CreateWorkout from './components/CreateWorkout';
import { useState } from 'react';

function HomePage() {
    // useState determines if the creation form should be visible
    const [form, setForm] = useState(0);

    return (
        <div id="home-content">
            <div className="home-menu">
                <h3>Your Workouts: </h3>
                <button className="create" onClick={() => setForm(1)}>Create a Workout</button>
            </div>
            <AllWorkouts />
            <CreateWorkout form={form} setForm={setForm}/>
            <br></br>
            <div className="home-menu">
                <h3>Your Meal Plans: </h3>
                <button className="create">Create a Meal Plan</button>
            </div>
            <AllMealPlans />
        </div>
    )
}

export default HomePage

