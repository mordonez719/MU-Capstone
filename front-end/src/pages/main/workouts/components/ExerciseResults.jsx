import './ExerciseResults.css'
import ExerciseCard from './ExerciseCard'
import { useEffect, useState } from 'react'

function ExerciseResults(){
    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async (query) => {
        const API_KEY = "blh/YcO1GAxLzjv/r35Y9g==0W271Io3ZcFagH9s"
        let apiURL = `https://api.api-ninjas.com/v1/exercises?name=${searchQuery}`

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