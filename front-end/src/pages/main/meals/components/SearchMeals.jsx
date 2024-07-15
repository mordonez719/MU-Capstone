/* 

SearchMeals.jsx

Menu for users to add filters and queries to their meal searches. Fetches data based on
user input.

Calls:
Called In: MealResults

*/

import './SearchMeals.css'
import { useState } from 'react'

function SearchMeals(props) {
    const [menu, toggleMenu] = useState(0);
    let optionsMap = props.optionsMap
    let setOptionsMap = props.setOptionsMap
    // const [optionsMap, setOptionsMap] = useState({})

    function handleMenu(){
        toggleMenu(!menu)
    }

    // initializes options for users to chose from
    const diets = ["balanced", "high-fiber", "high-protein"]
    const healths = ["alcohol-free", "vegetarian", "vegan"]
    const dishes = ["Main course", "Side dish", "Desserts"]

    const [updated, setUpdated] = useState(false)

    const handleCheck = (event, option, type) => {
        const checked = event.target.checked;
        optionsMap[option] = [type, checked];
        setOptionsMap(optionsMap)
        setUpdated(!updated) // updated checkboxes on change
    }

    // makes check boxes with id and name of "type" for each option in "names"
    function make_checks(names, type){
        return (
            names.map((option) => {
                // optionsMap[option] = [type, false]

                return (
                    <div id={`${type}-item`}>
                        <input type="checkbox" id={type} name={type} defaultChecked={false} checked={optionsMap[option] ? optionsMap[option][1] : false} 
                        onChange={(event) => handleCheck(event, option, type)}/>{option}
                    </div>        
                    )
            })
        )
    }

    // populizes arrays of check boxes for each field
    const diet_checks = make_checks(diets, "diet")
    const health_checks = make_checks(healths, "health")
    const dish_checks = make_checks(dishes, "dishType")

    console.log(optionsMap)

    return (
        <>
            <section id="search-container">
                <section id="main-search">
                    <section id="search-bar-container">
                        {/* <span className="material-symbols-outlined">search</span> */}
                        <input type="text" id="search-bar" 
                        placeholder="Search Meals..." 
                        onChange={(e)=>props.handleSearchChange(e.target.value)}/>
                    </section>
                    <button id="filters-button" onClick={handleMenu}>Filters
                        <span className="material-symbols-outlined">tune</span>
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
                                Calories:
                                <div className="slider-container">
                                    <input type="range" id="calorie-slider" />
                                </div>
                                Ingredient Count
                                <div className="slider-container">
                                    <input type="range" id="ingred-slider" />
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