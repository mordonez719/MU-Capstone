/*

MealDisplay.jsx

Displays a meal in the plan modal on the homepage.

Calls: 
Called In: PlanModal

*/

import './MealDisplay.css'

function MealDisplay(props) {
    return (
        <>
        <section className='meal-display-container'>{props.name}</section>
        </>
    )
}

export default MealDisplay