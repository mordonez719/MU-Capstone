/*

MealsPage.jsx

Page for users to search through meal data from the API.

Calls: MealResults
Called In: MainPage

*/

import "./MealsPage.css"
import MealResults from "./components/MealResults"

function MealsPage(props){
    return (
        <div id="meal-container">
        <h2>Find Meals</h2>
        <MealResults user={props.user}/>
        </div>
    )
}

export default MealsPage