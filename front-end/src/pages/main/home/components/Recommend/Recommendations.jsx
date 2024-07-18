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
    let topWords = []

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
            fetchData()
        }

        const sortedTypes = reduceSort(exTypes)
        const sortedMuscles = reduceSort(muscles);
        const sortedDiffs = reduceSort(difficulties);

    }, [history])

    // TODO: call top words api
    const fetchData = async () => {
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
    
    return (
        <>
        <div id="recommendation-container"> Recommendations Here
        </div>
        </>
    )
}

export default Recommendations