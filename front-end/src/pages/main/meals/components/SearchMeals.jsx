/* 

SearchMeals.jsx

Menu for users to add filters and queries to their meal searches. 
Selected filters are added to a map to be used for fetching.

Calls:
Called In: MealResults

*/

import './SearchMeals.css'
import { useState } from 'react'

function SearchMeals(props) {
    const [menu, toggleMenu] = useState(0);
    
    function handleMenu(){
        toggleMenu(!menu)
    }

    // sets map to hold filters
    let optionsMap = props.optionsMap
    let setOptionsMap = props.setOptionsMap

    // initializes options for users to chose from
    const diets = ["balanced", "high-fiber", "high-protein"]
    const healths = ["alcohol-free", "vegetarian", "vegan"]
    const dishes = ["Main course", "Side dish", "Desserts"]

    // initializes useState to re-render checkboxes on update
    const [updated, setUpdated] = useState(false)

    // updates the map to contain the filter category and its state, also changes the update useState to trigger a re-render
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
                return (
                    <div id={`${type}-item`}>
                        <input type="checkbox" id={type} name={type} defaultChecked={false} 
                        checked={optionsMap[option] ? optionsMap[option][1] : false} // in case the filter's key value pair hasn't been initialized (never clicked), defaults to false
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


    // sets minimum amount for calorie range
    const handleMinChange = (event) => {
        let newVal = parseInt(event.target.value);
        if ( newVal <= props.maxCal - 100){ // sets min value if at least 100 calories of range
            props.setMinCal(parseInt(event.target.value));
        } else if (props.maxCal + 100 <= 3500){ // increase max value to keep 100 range minimum
            props.setMaxCal(props.maxCal + 100)
        }
    }

    // sets maximum amount for calorie range
    const handleMaxChange = (event) => {
        let newVal = parseInt(event.target.value);
        if (newVal >= props.minCal + 100) { // sets max value if at least 100 calories of range
            props.setMaxCal(parseInt(event.target.value));
        } else if (props.minCal - 100 >= 0) { // decrease min value to keep 100 range minimum
            props.setMinCal(props.minCal - 100)
        }
    }

    return (
        <>
            <section id="search-container">
                <section id="main-search">
                    <section id="search-bar-container">
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
                                Calories:  {props.minCal}-{props.maxCal}
                                <div className="slider-container">
                                    <input type="range" className="calorie-slider" id="min-cal"
                                        min={0}
                                        max={3500}
                                        step={100} 
                                        value={props.minCal}
                                        onChange={handleMinChange}
                                    />
                                    <input type="range" className="calorie-slider" id="max-cal"
                                        min={0}
                                        max={3500}
                                        step={100} 
                                        value={props.maxCal}
                                        onChange={handleMaxChange}
                                    />
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