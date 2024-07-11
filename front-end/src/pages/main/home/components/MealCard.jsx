/*

MealCard.jsx

Displays a meal plan's title.

Calls: 
Called In: AllMealPlans

*/

import './MealCard.css'

function MealCard(props){
    // changes pop-up state on card click, takes id to populate pop-up
    function openModal(id) {
        props.setModalID(id);
        props.toggleModal(1);
    }

    return (
        <>
            <section className='home-card' onClick={() => openModal(props.id)}>
                <h3 className='plan-title'>{props.title}</h3>
                <h3 className='plan-creator'>{props.creator}</h3>
            </section>
        </>
    )
}

export default MealCard