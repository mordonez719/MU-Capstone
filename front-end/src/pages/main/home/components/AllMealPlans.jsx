/*

AllMealPlan.jsx

Fetches all meal plans associated with the current user
and creates a display card for each one.

Calls: MealCard, PlanModal
Called In: HomePage

*/

import './AllMealPlans.css'
import { useState, useEffect } from 'react';
import MealCard from './MealCard';
import PlanModal from './PlanModal';

function AllMealPlans(props){
    const [plans, setPlans] = useState([]);
    const [modalID, setModalID] = useState();
    const [modal, toggleModal] = useState(0);

    const user = props.user;

    useEffect(() => {
        fetchPlans();
    })

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

    // creates a meal card for each data point
    const meal_cards = plans.map((plan) => {
        return (
          <MealCard key={plan.id} id={plan.id} title={plan.title} desc={plan.description} setModalID={setModalID} toggleModal={toggleModal}/>
        )
        })

    return (
    <>
        <section id="all-mealplans">
            {meal_cards}
        </section>
        <PlanModal modal={modal} toggleModal={toggleModal} id={modalID}/>
    </>
    )
}

export default AllMealPlans