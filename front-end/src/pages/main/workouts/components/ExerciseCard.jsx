import './ExerciseCard.css'

function ExerciseCard(props){
    return (
        <section className="exercise-card-back">
            <h2>{props.name}</h2>
        </section>
    )
}

export default ExerciseCard