/*

ExerciseCard.jsx

Displays the name of an exercise fetched by the API and the dropdown menu to add the exercise
to a workout.

Calls: WorkoutDropdown
Called In: ExerciseResults

*/

import './ExerciseCard.css'
import WorkoutDropdown from './WorkoutDropdown'

function ExerciseCard(props){

    return (
        <section className="exercise-card-back">
            <h2 className='ex-name'>{props.name}</h2>
            <WorkoutDropdown user={props.user} exName={props.name}/>
        </section>
    )
}

export default ExerciseCard