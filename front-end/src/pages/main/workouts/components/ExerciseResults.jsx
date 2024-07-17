/*

ExerciseResults.jsx

Fetches and displays up exercises from the API that 
match the user's query. Users can search for exercise by a name
or a part of a name. Implements a loading state while data
is being fetched.

Calls: ExerciseCard, SearchExercises
Called In: WorkoutsPage

*/

import './ExerciseResults.css'
import ExerciseCard from './ExerciseCard'
import { useState } from 'react'
import SearchExercises from './SearchExercises';

function ExerciseResults(props){
    const [apiData, fillData] = useState([]);

    // initializes filters for searching
    const [searchQuery, setSearchQuery] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("Any")
    const [exType, setExType] = useState("Any")
    const [difficulty, setDifficulty] = useState("Any")

    // determines if the data is still being fetched
    const [loading, setLoading] = useState(false);

    // takes a user search query and fetches matching exercises
    const fetchData = async (query, muscleGroup, exType, difficulty) => {
        const API_KEY = "blh/YcO1GAxLzjv/r35Y9g==0W271Io3ZcFagH9s"
        
        // if a user selected an option, populate a filter string
        let nameQuery = ""
        if (query){
            nameQuery = `&name=${query}`
        }

        let muscleQuery = ""
        if (muscleGroup != "Any"){
            muscleQuery = `&muscle=${muscleGroup}`
        }

        let typeQuery = ""
        if (exType !="Any"){
            typeQuery = `&type=${exType}`
        }

        let diffQuery = ""
        if (difficulty !="Any"){
            diffQuery = `&difficulty=${difficulty}`
        }

        // puts all queries together to form full string for fetching
        let apiURL = `https://api.api-ninjas.com/v1/exercises?${nameQuery}${muscleQuery}${typeQuery}${diffQuery}`

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

    // updates the user's exercise search history
    const updateHistory = async (query, type, muscle, difficulty) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/search/exercise`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                "newSearch": query,
                "type": type,
                "muscle": muscle,
                "difficulty": difficulty
                }),
        }
        )
    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handleSearch = () => {
        fetchData(searchQuery, muscleGroup, exType, difficulty); // fetches exercises based of query and filters
        updateHistory(searchQuery, exType, muscleGroup, difficulty); // adds search query and filters to user's history
    }

    let exercises = []
    
    // creates an exercise card for each exercise fetched
    for (let i = 0; i < apiData.length; i++){
        let exercise = apiData[i];
        if (exercise){
            exercises.push(<ExerciseCard id={i} name={exercise.name} exercise={exercise} user={props.user} />);
        };
    };

    return (
        <section id="api-exercises">
            <div id="menu">
                <span className="material-symbols-outlined" onClick={handleSearch}>search</span>
                <SearchExercises handleSearchChange={handleSearchChange} setMuscleGroup={setMuscleGroup} setExType={setExType} difficulty={difficulty} setDifficulty={setDifficulty}/>
            </div>
            {loading ? (<p>Loading...</p>) : ( exercises )}
        </section>
    )
}

export default ExerciseResults