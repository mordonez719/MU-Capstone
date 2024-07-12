/* 

SearchMeals.jsx

Menu for users to add filters and queries to their meal searches. Fetches data based on
user input.

Calls:
Called In: MealResults

*/

import './SearchMeals.css'
import { useState } from 'react'

function SearchMeals() {
    const [menu, toggleMenu] = useState(0);

    function handleMenu(){
        toggleMenu(!menu)
    }

    // initializes options for users to chose from
    const diets = ["Balanced", "High-Fiber"]
    const healths = ["Alcohol-Free", "Vegetarian", "Vegan"]
    const dishes = ["Main Course", "Side", "Dessert"]

    // makes check boxes with id and name of "type" for each option in "names"
    function make_checks(names, type){
        return (
            names.map((option) => {
                return (
                    <div id={`${type}-item`}>
                        <input type="checkbox" id={type} name={type} />{option}
                    </div>        
                    )
            })
        )
    }

    // populizes arrays of check boxes for each field
    const diet_checks = make_checks(diets, "diet")
    const health_checks = make_checks(healths, "health")
    const dish_checks = make_checks(dishes, "dish")


    return (
        <>
            <section id="search-container">
                <section id="main-search">
                    <section id="search-bar-container">
                        <span className="material-symbols-outlined">search</span>
                        <input type="text" id="search-bar" 
                        placeholder="Search Meals..." />
                    </section>
                    <button id="filters-button" onClick={handleMenu}>Filters
                        <span class="material-symbols-outlined">tune</span>
                    </button>
                </section>
                {menu ? 
                    <section id="filter-menu">
                        ALL FILTERS HERE
                        <section id="all-filters">
                            <div className="diet-type"> Diet:
                                {diet_checks}                        
                            </div>
                            <div className="health"> Health:
                                {health_checks} 
                            </div>
                            <div className="dish-type"> Dish Type:
                                {dish_checks} 
                            </div>
                            <section id="all-slider">
                                <div className="slider-container">
                                    Calorie Range Double Slider
                                </div>
                                <div className="slider-container">
                                    Ingredient Count Single Slider
                                </div>
                            </section>
                        </section>
                    </section>
                    : ""}
            </section>
        </>
    )
}

export default SearchMeals