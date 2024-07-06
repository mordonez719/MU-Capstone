/*

PlanModal.jsx

Fetches a specific meal plan by the given ID.
Displays the meal plan's title and description.

Calls: 
Called In: AllMealPlans

*/

import { useState, useEffect } from "react";
import './PlanModal.css'

function PlanModal(props){
    const id = props.id;
    const [plan, setPlan] = useState([]);

    const fetchPlan = () => { 
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/plan/${id}`)
    .then(response => {
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    })
    .then(data => {
      setPlan(data);
    })
    .catch(error => {
      console.error('Error fetching plan:', error);
    });
    };

    if (props.modal && id){
        fetchPlan();
    }

    return (props.modal) ? (
        <>
            <section id="plan-modal-container">
                <h3 id="modal-title">{plan.title}</h3>
                <p id="modal-desc">{plan.description}</p>
                <button id="close-form" onClick={() => props.toggleModal(0)}>X</button>
            </section>
        </>
        ) : ""
}

export default PlanModal