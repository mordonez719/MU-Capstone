/*

WorkoutModal.jsx

Fetches a specific workout plan by the given ID.
Displays the workout's title and description.

Calls: 
Called In: AllWorkouts

*/

import { useState, useEffect } from "react";
import './WorkoutModal.css'
import ExerciseDisplay from "./ExerciseDisplay";

function WorkoutModal(props){
    const id = props.id;
    const [workout, setWorkout] = useState([]);
    const [exercises, setExercises] = useState([]);
   
    // gets information on specific workout with the given id
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

    // gets the exercises associated with the workout with the given id
    const fetchExercises = () => { 
      fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/workout/${id}/exercises`)
      .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
      })
      .then(data => {
        setExercises(data);
      })
      .catch(error => {
        console.error('Error fetching workout:', error);
      });
      };

    // fetches a plan if the modal is open and an id is given
    useEffect(() => {
      if (props.modal && id){
        fetchWorkout();
        fetchExercises();
    }
    }, [props.modal, id]);

    let wk_exercises = []
    
    // creates an exercise card for each exercise fetched
    for (let i = 0; i < exercises.length; i++){
        let exercise = exercises[i];
        if (exercise){
            wk_exercises.push(<ExerciseDisplay id={i} name={exercise.name}/>);
        };
    };

    return (props.modal) ? (
        <>
            <section id="wk-modal-container">
                <h3 id="modal-title">{workout.title}</h3>
                <p id="modal-desc">{workout.description}</p>
                <button id="close-form" onClick={() => props.toggleModal(0)}>X</button>
                <h4 className="ex-header">Exercises:</h4>
                <section className="ex-container">
                  {wk_exercises}
                </section>
            </section>
        </>
        ) : ""
}

export default WorkoutModal