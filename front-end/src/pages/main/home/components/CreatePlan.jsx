/*

CreatePlan.jsx

Displays a form for the user to add a new meal plans to their 
library. Asks for the meal plan's title and description and
makes a post to the database.

HTML % CSS from uiverse - https://uiverse.io/gharsh11032000/bitter-cow-59

Calls: 
Called In: HomePage

*/

import './CreatePlan.css'

function CreatePlan(props){
    // creates a meal plan when the user submits the form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.setForm(0);

        const form = event.target;

        // organizes user input
        const formData = new FormData(form);

        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/plan`, // adds a meal plan with the entered form input to the database
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: formData.get("plan-title"),
                  description: formData.get("desc"),
                  username: props.user
                }),
                }
            )
    }

    return (props.form) ? (
    <>
        <div class="form-container">
            New Meal Plan
            <button id="close-form" onClick={() => props.setForm(0)}>X</button>
            <form class="form" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="plan-title">Meal Plan Title</label>
                    <input type="text" id="plan-title" name="plan-title" required="" />
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

export default CreatePlan