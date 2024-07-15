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
    const [searchQuery, setSearchQuery] = useState("");
    const [muscleGroup, setMuscleGroup] = useState()
    const [exType, setExType] = useState()

    // determines if the data is still being fetched
    const [loading, setLoading] = useState(false);

    // takes a user search query and fetches matching exercises
    const fetchData = async (query, muscleGroup, exType) => {
        const API_KEY = "blh/YcO1GAxLzjv/r35Y9g==0W271Io3ZcFagH9s"
        
        let muscleQuery = ""
        if (muscleGroup){
            muscleQuery = `&muscle=${muscleGroup}`
        }

        let typeQuery = ""
        if (exType){
            typeQuery = `&type=${exType}`
        }

        let apiURL = `https://api.api-ninjas.com/v1/exercises?name=${query}${muscleQuery}${typeQuery}`

        console.log(apiURL)
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
        fetchData(searchQuery, muscleGroup, exType);
    }

    let exercises = []
    
    // creates an exercise card for each exercise fetched
    for (let i = 0; i < apiData.length; i++){
        let exercise = apiData[i];
        if (exercise){
            exercises.push(<ExerciseCard id={i} name={exercise.name} exercise={exercise} user={props.user} />);
        };
    };


    console.log(muscleGroup)
    console.log(exType)

    return (
        <section id="api-exercises">
            <div id="menu">
                <span className="material-symbols-outlined" onClick={handleSearch}>search</span>
                <SearchExercises handleSearchChange={handleSearchChange} setMuscleGroup={setMuscleGroup} setExType={setExType}/>
            </div>
            {loading ? (<p>Loading...</p>) : ( exercises )}
        </section>
    )
}

export default ExerciseResults