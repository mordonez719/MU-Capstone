/*

WorkoutsPage.jsx

Page for users to search through exercise data from the API.

Calls: ExerciseResults
Called In: MainPage

*/

import './WorkoutsPage.css'
import ExerciseResults from "./components/ExerciseResults"

function WorkoutsPage(){
    return (
        <div id="wk-container">
        <h2>Create Workouts Here</h2>
        <ExerciseResults />
        </div>
    )
}

export default WorkoutsPage