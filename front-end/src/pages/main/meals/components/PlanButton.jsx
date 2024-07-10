/* 

PlanButton.jsx

Creates a button displaying the meal plan name.
Adds the meal to the plan selected.

Calls:
Called In: PlanDropdown

*/

import './PlanButton.css'

function PlanButton(props){

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
        <button id={props.id} className='plan-button' onClick={handleAdd}>{props.name}</button>
        </>
    )
}

export default PlanButton