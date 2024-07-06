/*

WorkoutModal.jsx

Fetches a specific workout plan by the given ID.
Displays the workout's title and description.

Calls: 
Called In: AllWorkouts

*/

import { useState, useEffect } from "react";
import './WorkoutModal.css'

function WorkoutModal(props){
    const id = props.id;
    const [workout, setWorkout] = useState([]);

    const fetchWorkout = () => { 
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/workout/${id}`)
    .then(response => {
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    })
    .then(data => {
      setWorkout(data);
    })
    .catch(error => {
      console.error('Error fetching workout:', error);
    });
    };

    if (props.modal && id){
        fetchWorkout();
    }

    return (props.modal) ? (
        <>
            <section id="wk-modal-container">
                <h3 id="modal-title">{workout.title}</h3>
                <p id="modal-desc">{workout.description}</p>
                <button id="close-form" onClick={() => props.toggleModal(0)}>X</button>
            </section>
        </>
        ) : ""
}

export default WorkoutModal