import './CreateWorkout.css'
import { useEffect } from 'react'

function CreateWorkout(props){
    useEffect(() => {
    console.log("heree")
    for (let i = 0; i < props.added; i++){
        console.log(props.added[i])
    }
}, [props.added])

    return (props.form) ? (
    <>
        <section id="wk-form-container">
            Added Exercises Appear Here
            <button id="close-form" onClick={() => props.setForm(0)}>X</button>
        </section>
    </>
    ) : ""
}

export default CreateWorkout