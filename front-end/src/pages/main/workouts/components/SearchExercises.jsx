/* 

SearchExercises.jsx

Menu for users to add filters and queries to their exercise searches. Fetches data based on
user input.

Calls:
Called In: ExerciseResults

*/

import './SearchExercises.css'
import { useState } from 'react'

function SearchExercises(props) {
    const [menu, toggleMenu] = useState(0);

    function handleMenu(){
        toggleMenu(!menu)
    }

    // initializes options for users to chose from
    const types = ["Cardio", "Strength", "Powerlifting", "Stretching"]
    const muscles = ["Abdominals", "Biceps", "Calves", "Chest", "Glutes", "Lats"]

    // makes check boxes with id and name of "type" for each option in "names"
    function make_radios(names, type, func){
        return (
            names.map((option) => {
                return (
                    <div id={`${type}-item`}>
                        <input type="radio" id={type} name={type} value={option} onChange={(e)=>func(e.target.value)}/>{option}
                    </div>        
                    )
            })
        )
    }

    // populizes arrays of check boxes for each field
    const type_radios = make_radios(types, "type", props.setExType)
    const muscle_radios = make_radios(muscles, "muscle", props.setMuscleGroup)

    return (
        <>
            <section id="search-container">
                <section id="main-search">
                    <section id="search-bar-container">
                        {/* <span className="material-symbols-outlined">search</span> */}
                        <input type="text" id="search-bar" 
                        placeholder="Search Exercises..." onChange={(e)=>props.handleSearchChange(e.target.value)}/>
                    </section>
                    <button id="filters-button" onClick={handleMenu}>Filters
                        <span className="material-symbols-outlined">tune</span>
                    </button>
                </section>
                {menu ? 
                    <section id="filter-menu">
                        ALL FILTERS HERE
                        <section id="all-filters">
                            <div className="exercise-type"> Types
                                {type_radios}                        
                            </div>
                            <div className="health"> Muscle Group:
                                {muscle_radios} 
                            </div>
                            <section id="all-slider">
                                Difficulty
                                <div className="slider-container">
                                    <input type="range" id="diff-slider" />
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