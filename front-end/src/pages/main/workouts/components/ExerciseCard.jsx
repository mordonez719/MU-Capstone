/*

ExerciseCard.jsx

Displays the name of an exercise fetched by the API.

Calls: WorkoutDropdown
Called In: ExerciseResults

*/

import './ExerciseCard.css'
import WorkoutDropdown from './WorkoutDropdown'

function ExerciseCard(props){

    return (
        <section className="exercise-card-back">
            <h2 className='ex-name'>{props.name}</h2>
            <WorkoutDropdown user={props.user}/>
        </section>
    )
}

export default ExerciseCard