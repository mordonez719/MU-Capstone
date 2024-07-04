import './CreateWorkout.css'
import { useEffect } from 'react'

function CreateWorkout(props){
    const handleSubmit = (event) => {
        event.preventDefault();
        props.setForm(0);
    }

    return (props.form) ? (
    <>
        <section id="wk-form-container">
            New Workout
            <button id="close-form" onClick={() => props.setForm(0)}>X</button>
            <form id="wk-form" onSubmit={handleSubmit}>
                <div id="wk-ins">
                    <label for="wk-title">Title: </label>
                    <input type="text" id="wk-title" name="wk-title"/>
                        <br/><br/>
                    <label for="desc">Description: </label>
                    <input type="text" id="desc" name="desc"/>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </section>
    </>
    ) : ""
}

export default CreateWorkout