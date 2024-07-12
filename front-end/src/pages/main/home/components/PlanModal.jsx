/*

PlanModal.jsx

Fetches a specific meal plan by the given ID.
Displays the meal plan's title and description.

Calls: MealDisplay, FriendsPlans
Called In: AllMealPlans

*/

import { useState, useEffect } from "react";
import './PlanModal.css'
import MealDisplay from './MealDisplay'

function PlanModal(props){
    const id = props.id;
    const [plan, setPlan] = useState([]);
    const [meals, setMeals] = useState([]);

    // gets information on specific meal plan with the given id
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

    // gets the meals associated with the plan with the given id
    const fetchMeals = () => { 
      fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/plan/${id}/meals`)
      .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
      })
      .then(data => {
        setMeals(data);
      })
      .catch(error => {
        console.error('Error fetching workout:', error);
      });
      };

    // fetches a plan and its meals if the modal is open and an id is given
    useEffect(() => {
      if (props.modal && id){
        fetchPlan();
        fetchMeals();
    }
    }, [props.modal, id]);

    let plan_meals = []
    
    // creates a meal display card for each meal fetched
    for (let i = 0; i < meals.length; i++){
        let meal = meals[i];
        if (meal){
            plan_meals.push(<MealDisplay id={i} name={meal.name}/>);
        };
    };

    // adds a copy of the friend's meal plan to the current user's library
    function handleCopy(){
      fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/plan`, // creates an empty copy of the plan
        {
          method: "POST",
          headers: 
            {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({
            title: plan.title,
            description: plan.description,
            username: props.user
          }),
        }
      ).then(response => response.json())
      .then(data => {
        const newPlanID = data.id; // gets the ID of the newly created copy to add individual meals to
        for (let i = 0; i < meals.length; i++){ // for each meal
          let meal = meals[i];
          if (meal){
            fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/plan/meal`, // add a new meal model to the new copy
                {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      name: meal.name,
                      planID: newPlanID
                  }),
                  }
              )
          };
      };
      })
    }

    return (props.modal) ? (
        <>
            <section id="plan-modal-container">
                <h3 id="modal-title">{plan.title}</h3>
                <p id="modal-desc">{plan.description}</p>
                {props.add ? <button onClick={handleCopy}>Create a Copy</button> : ""}
                <button id="close-form" onClick={() => props.toggleModal(0)}>X</button>
                <h4 className="meal-header">Meals:</h4>
                <section className="meal-container">
                  {plan_meals}
                </section>
            </section>
        </>
        ) : ""
}

export default PlanModal