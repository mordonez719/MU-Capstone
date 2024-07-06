/*

CreatePlan.jsx

Displays a form for the user to add a new meal plans to their 
library. Asks for the meal plan's title and description and
makes a post to the database.

Calls: 
Called In: HomePage

*/

import './CreatePlan.css'

function CreatePlan(props){
    const handleSubmit = (event) => {
        event.preventDefault();
        props.setForm(0);

        const form = event.target;
        const formData = new FormData(form);

        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/plan`, // adds a board with the entered form input to the database
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
        <section id="plan-form-container">
            New Meal Plan
            <button id="close-form" onClick={() => props.setForm(0)}>X</button>
            <form id="plan-form" onSubmit={handleSubmit}>
                <div id="plan-ins">
                    <label for="plan-title">Title: </label>
                    <input type="text" id="plan-title" name="plan-title"/>
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

export default CreatePlan