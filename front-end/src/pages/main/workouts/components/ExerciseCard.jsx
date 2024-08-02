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
            <h5 className='some-detail'>{props.type} | {props.muscle} | {props.difficulty}</h5>
            <WorkoutDropdown user={props.user} exName={props.name} classNamer={props.classNamer}
            type={props.type} muscle={props.muscle} equipment={props.equipment} difficulty={props.difficulty} instructions={props.instructions}/>
            <div className='details-view'>
                <p className='details-equipment'>Equipment: {props.equipment}</p>
                <p className='details-instructions'>Instructions: {props.instructions}</p> 
            </div>
      </section>
    )
}

export default ExerciseCard