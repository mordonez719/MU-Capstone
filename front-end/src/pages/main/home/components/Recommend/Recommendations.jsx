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
    const user = props.user

    // get search history
    const fetchHistory = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/history/meal`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user
            }),
        })
        const data = await response.json()
        setHistory(data)
        // console.log(history)
        // if (history) {
        //     // console.log("true")
        //     let words = '';
        //     for (const word in history){
        //         words.concat(`rel_trg=${word}`)
        //         console.log(words)
        //         }
        // }
    };

    useEffect(() => {
        fetchHistory();
      },[])

    useEffect(() => {
        console.log(history)
        if (history) {
            console.log("true")
            let words = `rel_trg=${history[0]}`;
            for (let i = 1; i < history.length; i++){
                console.log(history[i])
                words = words.concat(`&rel_trg=${history[i]}`)
                console.log(words)
                }
            fetchData(words)
        }
    }, [history])

    // TODO: call top words api
    const fetchData = async (words) => {
        const baseURL = `https://api.datamuse.com/words?${words}`        

        const response = await fetch(baseURL);
        const data = await response.json();

        console.log(data)
    }

    // TODO: print top relevant search terms
    
    return (
        <>
        <div id="recommendation-container"> R
        </div>
        </>
    )
}

export default Recommendations