/* 

PlanButton.jsx

Creates a button displaying the meal plan name.
Adds the meal to the plan selected.

Calls:
Called In: PlanDropdown

*/

import './PlanButton.css'

function PlanButton(props){
    return (
        <>
        <button className='plan-button'>{props.name}</button>
        </>
    )
}

export default PlanButton