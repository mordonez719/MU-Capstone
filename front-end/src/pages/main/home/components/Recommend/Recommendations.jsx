/*

Recommendations.jsx

Generates and displays exercise recommendations based on
collected user data.

Calls:
Called In: HomePage

*/

import './Recommendations.css'
import { useState, useEffect } from 'react'

function Recommendations(props) {
    const [history, setHistory] = useState([])
    const [exTypes, setExTypes] = useState([])
    const [muscles, setMuscles] = useState([])
    const [difficulties, setDiffs] = useState([])

    const user = props.user
    let topWords = []
    let searches = []

    // get search history
    const fetchHistory = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user/data`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setHistory(data.exSearches) // recent queries
        setExTypes(data.exTypes) // recent type filters
        setMuscles(data.muscles) // recent muscle filters
        setDiffs(data.difficulties) // recent difficulty filters
    };

    useEffect(() => {
        fetchHistory();
      },[])

    useEffect(() => {
        if (history) {
            fetchWords().then(() => {
                const sortedWords = reduceSort(topWords)
                const sortedTypes = reduceSort(exTypes)
                const sortedMuscles = reduceSort(muscles);
                const sortedDiffs = reduceSort(difficulties);
                listSearches(sortedWords, sortedMuscles, sortedTypes, sortedDiffs) // generate searches with sorted user data
                fetchData(searches)
            })
        }
    }, [history])

    // call top words api to find related words to recent queries
    const fetchWords = async () => {
        for (let index in history){
            if (history[index]) {
                const baseURL = `https://api.datamuse.com/words?ml=${history[index]}&topics=workout,exercise,muscle`  
                const response = await fetch(baseURL);
                const data = await response.json();
                topWords.push(data[0].word)
            }
        }
    }

    // reduces an array to hold each value once, sorted by frequency
    function reduceSort(array) {
        const frequencyMap = {};
        array.forEach(filter => {
            if (!frequencyMap[filter]) {
                frequencyMap[filter] = 1;
            } else {
                frequencyMap[filter]++;
            }
        });
        const orderedMap = Object.entries(frequencyMap).sort((a,b) => b[1] - a[1]);
        return orderedMap.map(([word]) => word);
    }

    // generates a list of searches the user might like; fields in order of importance: queries, muscle groups, type, difficulty
    function listSearches(topQueries, topMuscles, topTypes, topDifficulties){
       
       
        // for (let i = 0; i < topQueries.length; i++) {
        //     let search_map = {}
        //     search_map["query"] = topQueries[i];
        //     search_map["muscle"] = "Any";
        //     search_map["type"] = "Any";
        //     search_map["difficulty"] = "Any";
        //     searches.push(search_map) // add a no-filter search for related queries
        // }


        for (let i = 0; i < topMuscles.length; i++) { // iterate through sorted filters in order of category weight and generate searches
            for (let j = 0; j < topTypes.length; j++) {
                for (let k = 0; k < topDifficulties.length; k++) {
                    if (searches.length >= 0) { // stop if 10 searches have been generated
                        break;
                    }
                    if (topMuscles[i] === "Any" && topTypes[j] === "Any" && topDifficulties[k] === "Any"){
                        break; // if no-filter search is reached before the array reaches ten, move to next filter -> postponing no-filter search allows for more personalized recs.
                    }
                    let search_map = {}
                    search_map["query"] = "";
                    search_map["muscle"] = topMuscles[i];
                    search_map["type"] = topTypes[j];
                    search_map["difficulty"] = topDifficulties[k];
                    searches.push(search_map) // add search with current filters
                }
            }
        }
        let search_map = {}
        search_map["query"] = "";
        search_map["muscle"] = "Any";
        search_map["type"] = "Any";
        search_map["difficulty"] = "Beginner";
        searches.push(search_map) // adds a beginner search, will recommend beginner exercises if no results were found from the user's data or if the user is new
    }

    const fetchData = async (searches) => {
        console.log("top")
        const results = [];
        const API_KEY = "blh/YcO1GAxLzjv/r35Y9g==0W271Io3ZcFagH9s";
        
        for (let i = 0; i < searches.length; i++){
            let search = searches[i]
        // if a user selected an option, populate a filter string
        let nameQuery = ""
        if (search.query){
            nameQuery = `&name=${search.query}`}

        let muscleQuery = ""
        if (search.muscle != "Any"){
            muscleQuery = `&muscle=${search.muscle}`}
        
        let typeQuery = ""

        if (search.type !="Any"){
            typeQuery = `&type=${search.type}`}

        let diffQuery = ""
        if (search.difficulty !="Any"){
            diffQuery = `&difficulty=${search.difficulty}`}

        // puts all queries together to form full string for fetching
        let apiURL = `https://api.api-ninjas.com/v1/exercises?${nameQuery}${muscleQuery}${typeQuery}${diffQuery}`

        const options = {
            method: "GET",
            headers: {
            "X-Api-Key": API_KEY,
            },
        };

        //////////////

        // const response = await fetch(apiURL, options);
        // const data = await response.json();

        // console.log(data)

        //////////////

        // results.push(data)
        // if (results.length === 10) break;
    }
        // console.log(`results: ${JSON.stringify(results)}`)
    
    }


    return (
        <>
        <div id="recommendation-container"> Recommendations Here
        </div>
        </>
    )
}

export default Recommendations