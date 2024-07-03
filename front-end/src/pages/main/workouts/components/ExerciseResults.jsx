import './ExerciseResults.css'
import ExerciseCard from './ExerciseCard'
import { useEffect, useState } from 'react'
import CreateWorkout from './CreateWorkout';

function ExerciseResults(){
    const [apiData, fillData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(0);
    const [added, setAdded] = useState([]);

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
    };

    const handleSearch = () => {
        fetchData(searchQuery);
    }

    let exercises = []

    for (let i = 0; i < apiData.length; i++){
        let exercise = apiData[i];
        if (exercise){
            exercises.push(<ExerciseCard form={form} id={i} name={exercise.name} exercise={exercise}>
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
            <ExerciseCard form={form} added={added} name="tester" />
            <ExerciseCard form={form} added={added} name="tester 2" />
            <ExerciseCard form={form} added={added} name="tester 3" />
            {exercises}
        </section>
    )
}

export default ExerciseResults