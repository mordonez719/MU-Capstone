import './MealResults.css'
import MealCard from './MealCard'
import { useEffect, useState } from 'react'
// import ClipLoader from "react-spinners/ClipLoader"

function MealResults(){
    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#ddcfff");

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    }

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