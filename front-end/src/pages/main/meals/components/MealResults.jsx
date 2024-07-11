/*

MealResults.jsx

Fetches and displays up to 10 meals from the API that 
match the user's query. Implements a loading state while data
is being fetched.

Calls: MealCard
Called In: MealsPage

*/

import './MealResults.css'
import MealCard from './MealCard'
import { useEffect, useState } from 'react'

function MealResults(props){
    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // determines if the data is still being fetched
    const [loading, setLoading] = useState(false);

    // gets API data, takes a query
    const fetchData = async (query) => {
        const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=967f1e08&app_key=aa2bbb79789e80e9e7a0a3f4ac52e973`

        const options = {
            method: "GET",
            headers: {
            "accept": "application/json",
            "Edamam-Account-User": "mordonez",
            "Accept-Language": "en"
            },  
        };

        setLoading(true);
        const response = await fetch(baseURL, options);
        const data = await response.json();

        fillData(data.hits);
        setLoading(false);

    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handleSearch = () => {
        fetchData(searchQuery);
    }

    let meals = []

    // creates a meal card for the first 10 meals received
    for (let i = 0; i < apiData.length && i < 11; i++){
        let meal = apiData[i];
        if (meal){
            meals.push(<MealCard id={i} name={meal.recipe.label} calories={meal.recipe.calories} img={meal.recipe.image} user={props.user}>
                </MealCard>);
        };
    };

    return (
        <section id="api-meals">
            <div id="menu">
            <section id="searcher">
                <span className="material-symbols-outlined" onClick={() => handleSearch()}>search</span>
                <input type="text" id="search-bar"
                value={searchQuery} 
                onChange={(e) => handleSearchChange(e.target.value)} 
                placeholder="Search Meals..." />
            </section>
            </div>
            {loading ? (<><p>Loading...</p></>) : ( meals )}
        </section>
    )
}

export default MealResults