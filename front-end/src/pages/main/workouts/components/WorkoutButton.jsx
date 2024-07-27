/* 

WorkoutButton.jsx

Creates a button displaying the workout name.
Adds the exercise to the workout selected.

Calls: Cursor
Called In: WorkoutDropdown

*/

import './WorkoutButton.css'
import Cursor from '../../../../../Cursor';
import heart from './cursor_heart.png'
import { useState } from 'react';

function WorkoutButton(props){
    const heart_icon = <img className={"heart-icon"} src={heart} />
    const [target, setTarget] = useState(null); // determines if the mouse is in the area to display the icon

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
        {target && <Cursor offset={{ x: 3, y: -505 }}>{heart_icon}</Cursor>}
        <button id={props.id} className='wk-button' onClick={handleAdd} onMouseEnter={() => setTarget(true)} onMouseLeave={() => setTarget(null)}>{props.name}</button>
        </>
    )
}

export default WorkoutButton