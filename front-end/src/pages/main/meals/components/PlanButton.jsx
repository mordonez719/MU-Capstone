/* 

PlanButton.jsx

Creates a button displaying the meal plan name.
Adds the meal to the plan selected.

Calls: Cursor
Called In: PlanDropdown

*/

import './PlanButton.css'
import Cursor from '../../../../../Cursor';
import heart from './cursor_heart.png'
import { useState } from 'react';

function PlanButton(props){
    const heart_icon = <img className={"heart-icon"} src={heart} />
    const [target, setTarget] = useState(null); // determines if the mouse is in the area to display the icon

    // adds meal associated with the clicked button to the selected plan
    function handleAdd(){
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/plan/meal`,
              {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: props.mealName,
                    planID: parseInt(props.id)
                }),
                }
            )
    }
    return (
        <>
        {target && <Cursor offset={{ x: 3, y: -505 }}>{heart_icon}</Cursor>}
        <button id={props.id} className='plan-button' onClick={handleAdd} onMouseEnter={() => setTarget(true)} onMouseLeave={() => setTarget(null)}>{props.name}</button>
        </>
    )
}

export default PlanButton