/*

MealResults.jsx

Fetches and displays up to 10 meals from the API that 
match the user's query. Implements a loading state while data
is being fetched.

Calls: MealCard, SearchMeals
Called In: MealsPage, SearchMeals

*/

import './MealResults.css'
import MealCard from './MealCard'
import SearchMeals from './SearchMeals'
import { useState } from 'react'

function MealResults(props){
    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterMap, setFilterMap] = useState({})
    const [minCal, setMinCal] = useState(0);
    const [maxCal, setMaxCal] = useState(3500)

    // determines if the data is still being fetched
    const [loading, setLoading] = useState(false);

    // gets API data, takes a query and the optional filters
    const fetchData = async (query, filters, calories) => {
        const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=967f1e08&app_key=aa2bbb79789e80e9e7a0a3f4ac52e973${filters}${calories}`        

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

    // updates the user's meal search history
    const updateHistory = async (query) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/search/meal`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                "newSearch": query
                }),
        }
        )
    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handleSearch = () => {
        let filters = ''; // empty string for optional filters

        // iterates through filter map, adding filters to the string if they were checked off
        for (var index in filterMap) {
            var mapKey = index;
            if (filterMap[mapKey][1]) { // checked off?
                let filtString = `&${filterMap[mapKey][0]}=${mapKey}` // creates a string of the applicable filter
                filtString = filtString.replace(" ", "%20") // formats for spaces
                filters = filters.concat(filtString) // adds the new string to the aggregate filters string
            }
        }

        let calories = `&calories=${minCal}-${maxCal}` // formats calorie variables for fetching

        fetchData(searchQuery, filters, calories); // passes the types queries and selected filters for fetching
        updateHistory(searchQuery) // adds search query to user's history
    }

    // empty array for meal displays
    let meals = []

    // creates a meal card for the first 10 meals received
    for (let i = 0; i < apiData.length && i < 11; i++){
        let meal = apiData[i];
        if (meal){
            meals.push(<MealCard id={i} name={meal.recipe.label} calories={parseInt(meal.recipe.calories)} img={meal.recipe.image} user={props.user}>
                </MealCard>);
        };
    };

    return (
        <section id="api-meals">
            <div id="menu">
                <span className="material-symbols-outlined" onClick={handleSearch}>search</span>
                <SearchMeals handleSearchChange={handleSearchChange} 
                optionsMap={filterMap} setOptionsMap={setFilterMap} 
                minCal={minCal} setMinCal={setMinCal}
                maxCal={maxCal} setMaxCal={setMaxCal}
                />
            </div>
            {loading ? (<><p>Loading...</p></>) : ( meals )}
        </section>
    )
}

export default MealResults