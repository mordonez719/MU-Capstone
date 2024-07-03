import './ExerciseCard.css'

function ExerciseCard(props){
    function addWorkout(workout){
        console.log("adding")
        props.added.push(workout)
        console.log(props.added)
    }

    return (props.form) ? (
        <section className="exercise-card-back">
            <h2>{props.name}</h2>
            <button onClick={() => addWorkout(props.name)}>Add</button>
        </section>
    ) : (
        <section className="exercise-card-back">
            <h2>{props.name}</h2>
        </section>
    )
}

export default ExerciseCard