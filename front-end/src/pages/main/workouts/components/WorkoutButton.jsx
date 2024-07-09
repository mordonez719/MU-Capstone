/* 

WorkoutButton.jsx

Creates a button displaying the workout name.
Adds the exercise to the workout selected.

Calls:
Called In: WorkoutDropdown

*/

import './WorkoutButton.css'

function WorkoutButton(props){
    return (
        <>
        <button className='wk-button'>{props.name}</button>
        </>
    )
}

export default WorkoutButton