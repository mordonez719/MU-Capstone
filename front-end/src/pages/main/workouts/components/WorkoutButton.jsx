/* 

WorkoutButton.jsx

Creates a button displaying the workout name.
Adds the exercise to the workout selected.

Calls:
Called In: WorkoutDropdown

*/

import './WorkoutButton.css'

function WorkoutButton(props){

    // adds exercise associated with the clicked button to the selected workout
    function handleAdd(){
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/workout/exercise`,
              {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: props.exName,
                    type: props.type,
                    muscle: props.muscle,
                    equipment: props.equipment,
                    difficulty: props.difficulty,
                    instructions: props.instructions,
                    workoutID: parseInt(props.id)
                }),
                }
            )
    }
    return (
        <>
        <button id={props.id} className='wk-button' onClick={handleAdd}>{props.name}</button>
        </>
    )
}

export default WorkoutButton