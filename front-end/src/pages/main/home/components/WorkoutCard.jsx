/*

WorkoutCard.jsx

Displays a workout's title.

Calls: 
Called In: AllWorkouts

*/

import './WorkoutCard.css'

function WorkoutCard(props){
    function openModal(id) {
        console.log("opening")
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