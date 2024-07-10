/* 

WorkoutDropdown.jsx

Creates a dropdown menu of a user's workouts for the user to select what workout
to add an exercise to.

Calls: WorkoutButton
Called In: ExerciseCard

*/

import { useState } from 'react';
import './WorkoutDropdown.css'
import WorkoutButton from './WorkoutButton';

function WorkoutDropdown(props){
    const user = props.user;

    const [workouts, setWorkouts] = useState([]);
    const [drop, setDrop] = useState(false);

    // fetches all workouts associated with the current user
    const fetchWorkouts = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/workouts`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user
            }),
        })
        .then(response => response.json())
        .then(data => {
            setWorkouts(data);
          })
    }

    // creates a workout button for each fetched workout
    const workout_buttons = workouts.map((workout) => {
    return (
      <WorkoutButton key={workout.id} id={workout.id} name={workout.title} exName={props.exName}/>
    )
    })

    // gets workouts and toggles dropdown menu display status
    function handleClick(){
        fetchWorkouts();
        setDrop(!drop);
    }


    return (
        <section className='dropdown'>
            <button className="add-to-wk" onClick={handleClick}>Add</button>
                {drop ? 
                <section className='dropdown-buttons'>
                {workout_buttons} 
                </section>
                : ""}
        </section>
    )
}

export default WorkoutDropdown