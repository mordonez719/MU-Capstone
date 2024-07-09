/*

ExerciseResults.jsx

Fetches and displays up exercises from the API that 
match the user's query. Users can search for exercise by a name
or a part of a name. Implements a loading state while data
is being fetched.

Calls: ExerciseCard
Called In: MainPage

*/

import './ExerciseResults.css'
import ExerciseCard from './ExerciseCard'
import { useState } from 'react'

function ExerciseResults(){
    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // determines if the data is still being fetched
    const [loading, setLoading] = useState(false);

    // takes a user search query and fetches matching exercises
    const fetchData = async (query) => {
        const API_KEY = "blh/YcO1GAxLzjv/r35Y9g==0W271Io3ZcFagH9s"
        let apiURL = `https://api.api-ninjas.com/v1/exercises?name=${query}`

        const options = {
            method: "GET",
            headers: {
            "X-Api-Key": API_KEY,
            },
        };
        setLoading(true);
        const response = await fetch(apiURL, options);
        const data = await response.json();

        fillData(data);
        setLoading(false);
    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handleSearch = () => {
        fetchData(searchQuery);
    }

    let exercises = []
    
    // creates an exercise card for each exercise fetched
    for (let i = 0; i < apiData.length; i++){
        let exercise = apiData[i];
        if (exercise){
            exercises.push(<ExerciseCard id={i} name={exercise.name} exercise={exercise}>
                </ExerciseCard>);
        };
    };

    return (
        <section id="api-exercises">
            <div id="menu">
                <section id="searcher">
                    <span className="material-symbols-outlined" onClick={() => handleSearch()}>search</span>
                    <input id="search-bar" type="text" value={searchQuery} 
                    onChange={(e) => handleSearchChange(e.target.value)} 
                    placeholder="Search Excerices..." />
                </section>
            </div>
            {loading ? (<p>Loading...</p>) : ( exercises )}
        </section>
    )
}

export default ExerciseResults