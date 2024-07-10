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
        console.log("adding")
        console.log(parseInt(props.id))
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/workout/exercise`,
              {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: props.exName,
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