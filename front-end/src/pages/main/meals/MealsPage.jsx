/*

MealsPage.jsx

Page for users to search through meal data from the API.

Calls: MealResults
Called In: MainPage

*/

import "./MealsPage.css"
import MealResults from "./components/MealResults"

function MealsPage(){
    return (
        <div id="meal-container">
        <h2>Find Meal Plans Here</h2>
        <MealResults />
        </div>
    )
}

export default MealsPage