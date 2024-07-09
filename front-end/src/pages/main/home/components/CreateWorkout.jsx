/*

CreateWorkout.jsx

Displays a form for the user to add a new workouts to their 
library. Asks for the workout's title and description and
makes a post to the database.

Calls: 
Called In: HomePage

*/

import './CreateWorkout.css'

function CreateWorkout(props){

    // creates a workout when the user submits the form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.setForm(0);

        const form = event.target;
        
        // organizes user input
        const formData = new FormData(form);

        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/workout`, // adds a board with the entered form input to the database
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: formData.get("wk-title"),
                  description: formData.get("desc"),
                  username: props.user
                }),
                }
            )
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