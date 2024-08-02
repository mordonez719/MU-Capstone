/*

CreateWorkout.jsx

Displays a form for the user to add a new workouts to their 
library. Asks for the workout's title and description and
makes a post to the database.

HTML % CSS from uiverse - https://uiverse.io/gharsh11032000/bitter-cow-59

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

        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/workout`, // adds a workout with the entered form input to the database
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
        <div class="form-container">
            New Workout
            <button id="close-form" onClick={() => props.setForm(0)}>X</button>
            <form class="form" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="wk-title">Workout Title</label>
                    <input type="text" id="wk-title" name="wk-title" required="" />
                </div>
                <div class="form-group">
                    <label for="desc">Description</label>
                    <textarea name="desc" id="desc" rows="10" cols="50" required="" />
                </div>
                <button class="form-submit-btn" type="submit">Submit</button>
            </form>
        </div>
    </>
    ) : ""
}

export default CreateWorkout