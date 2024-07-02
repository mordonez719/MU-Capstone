import './ExerciseResults.css'
import ExerciseCard from './ExerciseCard'
import { useEffect, useState } from 'react'

function ExerciseResults(){
    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async (query) => {
        const API_KEY = "blh/YcO1GAxLzjv/r35Y9g==0W271Io3ZcFagH9s"
        let apiURL = `https://api.api-ninjas.com/v1/exercises?name=${searchQuery}`

        const options = {
            method: "GET",
            headers: {
            "X-Api-Key": API_KEY,
            },
        };

        const response = await fetch(apiURL, options);
        const data = await response.json();

        console.log(data)
        fillData(data);

    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        fetchData(value);
    };

    let exercises = []

    for (let i = 0; i < apiData.length; i++){
        let exercise = apiData[i];
        if (exercise){
            exercises.push(<ExerciseCard id={i} name={exercise.name}>
                </ExerciseCard>);
        };
    };

    return (
        <section id="api-exercises">
            <div id="menu">
                <input id="search-bar" type="text" value={searchQuery} 
                onChange={(e) => handleSearchChange(e.target.value)} 
                placeholder="Search Excerices..." />
                <button id="create-wk">Create a Workout</button>
            </div>
            {exercises}
        </section>
    )
}

export default ExerciseResults