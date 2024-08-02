/*

MealCard.jsx

Displays image, name, and calories of a meal fetched by the API as well as a dropdown
menu to add the meal to a meal plan.

Calls: PlanDropdown
Called In: MealResults

*/

import './MealCard.css'
import PlanDropdown from './PlanDropdown'

function MealCard(props){
    let recipe = props.recipe

    return (
        <section className="meal-card-back">
            <h2 className='meal-name'>{props.name}</h2>
            <h6 className='some-detail'>Calories: {props.calories}</h6>
            <PlanDropdown user={props.user} mealName={props.name}/>
            <div className='details-view'>
                <p>Meal Type: {recipe.mealType}</p>
                <p>Dish Type: {recipe.dishType}</p>
                <p>Health Labels: {JSON.stringify(recipe.healthLabels)}</p>
                <p>Diet Labels: {JSON.stringify(recipe.dietLabels)}</p>
                <a href={recipe.url}>Recipe: {recipe.url}</a>
            </div>
        </section>
    )
}

export default MealCard