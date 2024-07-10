/*

ExerciseDisplay.jsx

Displays an exercise in the workout modal on the homepage.

Calls: 
Called In: WorkoutModal

*/

import './ExerciseDisplay.css'

function ExerciseDisplay(props) {
    return (
        <>
        <section className='ex-display-container'>{props.name}</section>
        </>
    )
}

export default ExerciseDisplay