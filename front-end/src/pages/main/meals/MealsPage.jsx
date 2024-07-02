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