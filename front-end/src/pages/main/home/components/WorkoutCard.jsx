/*

WorkoutCard.jsx

Displays a workout's title.

Calls: 
Called In: AllWorkouts

*/

import './WorkoutCard.css'

function WorkoutCard(props){
    // changes pop-up state on card click, takes id to populate pop-up
    function openModal(id) {
        props.setModalID(id);
        props.toggleModal(1);
    }

    return (
        <>
            <section className='home-card' onClick={() => openModal(props.id)}>
                <h3 className='wk-title'>{props.title}</h3>
            </section>
        </>
    )
}

export default WorkoutCard