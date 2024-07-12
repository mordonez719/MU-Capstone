/* 

SearchExercises.jsx

Menu for users to add filters and queries to their exercise searches. Fetches data based on
user input.

Calls:
Called In: ExerciseResults

*/

import './SearchExercises.css'
import { useState } from 'react'

function SearchExercises() {
    const [menu, toggleMenu] = useState(0);

    function handleMenu(){
        toggleMenu(!menu)
    }

    // initializes options for users to chose from
    const types = ["Cardio", "Strength", "Powerlifting", "Stretching"]
    const muscles = ["Abdominals", "Biceps", "Calves", "Chest", "Glutes", "Lats"]

    // makes check boxes with id and name of "type" for each option in "names"
    function make_radios(names, type){
        return (
            names.map((option) => {
                return (
                    <div id={`${type}-item`}>
                        <input type="radio" id={type} name={type} />{option}
                    </div>        
                    )
            })
        )
    }

    // populizes arrays of check boxes for each field
    const type_checks = make_radios(types, "type")
    const muscle_checks = make_radios(muscles, "muscle")


    return (
        <>
            <section id="search-container">
                <section id="main-search">
                    <section id="search-bar-container">
                        <span className="material-symbols-outlined">search</span>
                        <input type="text" id="search-bar" 
                        placeholder="Search Exercises..." />
                    </section>
                    <button id="filters-button" onClick={handleMenu}>Filters
                        <span class="material-symbols-outlined">tune</span>
                    </button>
                </section>
                {menu ? 
                    <section id="filter-menu">
                        ALL FILTERS HERE
                        <section id="all-filters">
                            <div className="exercise-type"> Types
                                {type_checks}                        
                            </div>
                            <div className="health"> Muscle Group:
                                {muscle_checks} 
                            </div>
                            <section id="all-slider">
                                <div className="slider-container">
                                    Difficulty Slider
                                </div>
                            </section>
                        </section>
                    </section>
                    : ""}
            </section>
        </>
    )
}

export default SearchExercises