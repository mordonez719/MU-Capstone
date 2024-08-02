/*

ExerciseDisplay.jsx

Displays an exercise in the workout modal on the homepage.

Calls: 
Called In: WorkoutModal

*/

import './ExerciseDisplay.css'
import { useState } from 'react'

function ExerciseDisplay(props) {
    const [instruct, toggleInstruct] = useState(0)
    

    return (
        <>
        <section className='ex-display-container' onClick={() => toggleInstruct(!instruct)}>
            <p className='ex-name'>{props.name}</p>
            {instruct ? <p>Instructions: {props.instructions} </p>: ""}
        </section>
        </>
    )
}

export default ExerciseDisplay