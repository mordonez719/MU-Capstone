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
import Loading from '../../../../Loading'
import { useState } from 'react'

function MealResults(props){
    const defaultMin = 0;
    const defaultMax = 3500;

    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterMap, setFilterMap] = useState({})
    const [minCal, setMinCal] = useState(defaultMin);
    const [maxCal, setMaxCal] = useState(defaultMax)

    // determines if the data is still being fetched
    const [loading, setLoading] = useState(false);

    // gets API data, takes a query and the optional filters
    const fetchData = async (query, filters) => {
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

        function applyFilter(meal) { // returns true if a recipe adheres to the given filter
            for (var index in filters) { // iterates through categories, ex. dish type, diet, health
                var category = index;
                let filter_list = filters[category]
                for (var filter_index in filter_list){ // iterates thorugh specific filters in each category
                    let filter = filter_list[filter_index]
                    if ((meal.recipe[category] && !meal.recipe[category].includes(filter)) || !meal.recipe[category]){ // return false if the filter does not apply
                        return false;
                    }
                }
            }
            if (meal.recipe.calories < minCal || meal.recipe.calories > maxCal){ // check that the meal is within the given calorie range
                return false;
            }
            return true; // return true if the meal has the wanted characteristics and is within the calorie range
        }

        const filtered_meals = data.hits.filter(applyFilter); // applies the filters to all the intial meals returned by the API

        fillData(filtered_meals);
        setLoading(false);
    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handleSearch = () => {
        let applying = {} // organizes filters by category
        applying["dietLabels"] = []
        applying["healthLabels"] = []
        applying["dishType"] = []

        for (var index in filterMap) {
            var mapKey = index;
            if (filterMap[mapKey][1]) { // checked off? add to list of relevant filter category
                if (filterMap[mapKey][0] === "diet") {
                    applying["dietLabels"].push(mapKey)
                }
                if (filterMap[mapKey][0] === "health") {
                    applying["healthLabels"].push(mapKey)
                }
                if (filterMap[mapKey][0] === "dishType") {
                    applying["dishType"].push(mapKey)
                }
            }
        }

        fetchData(searchQuery, applying); // passes the types queries and selected filters for fetching
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
            {loading ? 
            (<>
            <p>Loading...</p>
            <Loading /> 
            </>) 
            : ( meals )}
        </section>
    )
}

export default MealResults