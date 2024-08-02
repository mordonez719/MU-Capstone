/*

WorkoutsPage.jsx

Page for users to search through exercise data from the API.

Calls: ExerciseResults
Called In: MainPage

*/

import './WorkoutsPage.css'
import ExerciseResults from "./components/ExerciseResults"

function WorkoutsPage(props){
    return (
        <div id="wk-container">
        <h2>Find Exercises</h2>
        <ExerciseResults user={props.user} setSearchChange={props.setSearchChange} searchChange={props.searchChange}/>
        </div>
    )
}

export default WorkoutsPage