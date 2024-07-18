/*

Recommendations.jsx

Displays all meal and exercise recommendations based on
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
        setHistory(data.exSearches)
        setExTypes(data.exTypes)
        setMuscles(data.muscles)
        setDiffs(data.difficulties)
    };

    useEffect(() => {
        fetchHistory();
      },[])

    useEffect(() => {
        if (history) {
            let words = `rel_trg=${history[0]}`;
            for (let i = 1; i < history.length; i++){
                if (history[i]){
                words = words.concat(`&rel_trg=${history[i]}`)
                }}
            fetchData(words)
        }
    }, [history])

    // TODO: call top words api
    const fetchData = async (words) => {
        const baseURL = `https://api.datamuse.com/words?${words}`  
        const response = await fetch(baseURL);
        const data = await response.json();
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
    }
    
    return (
        <>
        <div id="recommendation-container"> Recommendations Here
        </div>
        </>
    )
}

export default Recommendations