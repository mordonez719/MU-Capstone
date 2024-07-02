import './MealResults.css'
import MealCard from './MealCard'
import { useEffect, useState } from 'react'

function MealResults(){
    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const baseURL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=967f1e08&app_key=aa2bbb79789e80e9e7a0a3f4ac52e973%09&diet=balanced&calories=0-700&imageSize=LARGE"

    const fetchData = async (query) => {

        const options = {
            method: "GET",
            headers: {
            "accept": "application/json",
            "Edamam-Account-User": "mordonez",
            "Accept-Language": "en"
            },  
        };

        const response = await fetch(baseURL, options);
        const data = await response.json();

        console.log(data.hits)
        fillData(data.hits);
    }

    const handleSearchChange = (value) => {
        console.log("changing")
        setSearchQuery(value);
        fetchData(value);
    };

    let meals = []

    for (let i = 0; i < apiData.length && i < 11; i++){
        let meal = apiData[i];
        if (meal){
            meals.push(<MealCard id={i} name={meal.recipe.label} calories={meal.recipe.calories} img={meal.recipe.image}>
                </MealCard>);
        };
    };

    return (
        <section id="api-meals">
            <div id="menu">
                <input type="text" id="search-bar"
                value={searchQuery} 
                onChange={(e) => handleSearchChange(e.target.value)} 
                placeholder="Search Meals..." />
                <button id="create-plan">Create a Meal Plan</button>
            </div>
            {meals}
        </section>
    )
}

export default MealResults