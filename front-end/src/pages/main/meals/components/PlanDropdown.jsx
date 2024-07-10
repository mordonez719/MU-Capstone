/* 

PlanDropdown.jsx

Creates a dropdown menu of a user's meal plans for the user to select what plan
to add a meal to.

Calls: PlanButton
Called In: MealCard

*/

import { useState } from 'react';
import './PlanDropdown.css'
import PlanButton from './PlanButton';

function PlanDropdown(props){
    const user = props.user;

    const [plans, setPlans] = useState([]);
    const [drop, setDrop] = useState(false);

    // fetches all plans associated with the current user
    const fetchPlans = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/plans`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user
            }),
        })
        .then(response => response.json())
        .then(data => {
            setPlans(data);
          })
    }

    // creates a plan button for each fetched plan
    const plans_buttons = plans.map((plan) => {
    return (
      <PlanButton key={plan.id} id={plan.id} name={plan.title} mealName={props.mealName}/>
    )
    })

    // gets plans and toggles dropdown menu display status
    function handleClick(){
        fetchPlans();
        setDrop(!drop);
    }


    return (
        <section className='dropdown'>
            <button className="add-to-plan" onClick={handleClick}>Add</button>
                {drop ? 
                <section className='dropdown-buttons'>
                {plans_buttons} 
                </section>
                : ""}
        </section>
    )
}

export default PlanDropdown