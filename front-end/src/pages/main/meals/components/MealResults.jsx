/*

MealResults.jsx

Fetches and displays up to 10 meals from the API that 
match the user's query. Implements a loading state while data
is being fetched.

Calls: MealCard
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

    // determines if the data is still being fetched
    const [loading, setLoading] = useState(false);

    // gets API data, takes a query
    const fetchData = async (query, filters) => {

        const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=967f1e08&app_key=aa2bbb79789e80e9e7a0a3f4ac52e973${filters}`
        // ${filters}
        

        console.log(baseURL);

        const options = {
            method: "GET",
            headers: {
            "accept": "application/json",
            "Edamam-Account-User": "mordonez",
            "Accept-Language": "en"
            },  
        };

        // https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=967f1e08&app_key=aa2bbb79789e80e9e7a0a3f4ac52e973&diet=High-Fiber (MealResults.jsx, line 30)

        setLoading(true);
        const response = await fetch(baseURL, options);
        const data = await response.json();

        if (data.hits){
            fillData(data.hits);
            console.log(data.hits)
        } else{
            fillData([])
            console.log("none")
        }
        // fillData(data.hits);
        // console.log(data.hits)
        setLoading(false);

    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handleSearch = () => {
        // console.log(filterMap)
        console.log(searchQuery)

        let filters = '';

        for (var index in filterMap) {
            var mapKey = index;
            if (filterMap[mapKey][1]) {
                let filtString = `&${filterMap[mapKey][0]}=${mapKey}`
                filtString = filtString.replace(" ", "%20")
                console.log(filtString)
                filters = filters.concat(filtString)
            }
        }

        console.log(filters)
        fetchData(searchQuery, filters);
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
                <span className="material-symbols-outlined" onClick={handleSearch}>search</span>
                <SearchMeals handleSearchChange={handleSearchChange} optionsMap={filterMap} setOptionsMap={setFilterMap}/>
            </div>
            {loading ? (<><p>Loading...</p></>) : ( meals )}
        </section>
    )
}

export default MealResults