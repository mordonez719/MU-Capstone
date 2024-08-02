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
            {instruct ? 
            <>
            <p>Instructions: {props.instructions}</p>
            <span class="material-symbols-outlined" id="drop-arrow">arrow_drop_up</span>            
            </>
            :
            <span class="material-symbols-outlined" id="drop-arrow">arrow_drop_down</span>}
        </section>
        </>
    )
}

export default ExerciseDisplay