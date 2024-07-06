/*

MealCard.jsx

Displays a meal plan's title.

Calls: 
Called In: AllMealPlans

*/

import './MealCard.css'

function MealCard(props){
    function openModal(id) {
        props.setModalID(id);
        props.toggleModal(1);
    }

    return (
        <>
            <section className='home-card' onClick={() => openModal(props.id)}>
                <h3 className='plan-title'>{props.title}</h3>
            </section>
        </>
    )
}

export default MealCard