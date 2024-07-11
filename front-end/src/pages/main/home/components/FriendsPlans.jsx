/*

FriendsPlans.jsx

Fetches all meal plans made by the current user's friends
and creates a display card for each one.

Calls: 
Called In: HomePage

*/

import './FriendsPlans.css'
import { useState, useEffect } from 'react'
import MealCard from './MealCard'
import PlanModal from './PlanModal';

function FriendsPlans(props){
    const [plans, setPlans] = useState([]);
    const [modalID, setModalID] = useState();
    const [modal, toggleModal] = useState(0);

    const friends=props.friends

    useEffect(() => {
        fetchPlans();
    })

    // fetches all meal plans associated with the current user's friends
    const fetchPlans = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/friends/plans`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                users: friends
            }),
        })
        .then(response => response.json())
        .then(data => {
            setPlans(data);
          })
    }

    // creates a meal plan card for each data point
    const plan_cards = plans.map((plan) => {
    return (
        <MealCard key={plan.id} id={plan.id} creator={plan.username} title={plan.title} desc={plan.description} setModalID={setModalID} toggleModal={toggleModal}/>
    )
    })

    return(
        <>
            <section id="friends-plans">
                {plan_cards}
            </section>
            <PlanModal user={props.user} modal={modal} toggleModal={toggleModal} id={modalID} add={true}/>
        </>
    )
}

export default FriendsPlans