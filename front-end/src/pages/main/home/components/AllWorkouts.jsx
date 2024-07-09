/*

AllWorkouts.jsx

Fetches all workouts associated with the current user
and creates a display card for each one.

Calls: WorkoutCard, WorkoutModal
Called In: HomePage

*/

import './AllWorkouts.css'
import { useState, useEffect } from 'react';
import WorkoutCard from './WorkoutCard';
import WorkoutModal from './WorkoutModal';

function AllWorkouts(props){
    const [workouts, setWorkouts] = useState([]);
    const [modalID, setModalID] = useState();
    const [modal, toggleModal] = useState(0);

    const user = props.user;

    useEffect(() => {
        fetchWorkouts();
    })

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

    // creates a workout card for each data point
    const workout_cards = workouts.map((workout) => {
    return (
      <WorkoutCard key={workout.id} id={workout.id} title={workout.title} desc={workout.description} setModalID={setModalID} toggleModal={toggleModal}/>
    )
    })

    return (
    <>
        <section id="all-workouts">
            {workout_cards}
        </section>
        <WorkoutModal modal={modal} toggleModal={toggleModal} id={modalID}/>
    </>
    )
}

export default AllWorkouts