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
    return (
        <section className="meal-card-back">
            <span>
                <img href={props.img} className='meal-pic' />
            </span>
                <span>
                    <h2>{props.name}</h2>
                    <h6>Calories: {props.calories}</h6>
                </span>
            <PlanDropdown user={props.user} mealName={props.name}/>
        </section>
    )
}

export default MealCard