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
        console.log(props.user)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/history`,
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
    };

    useEffect(() => {
        fetchHistory();
      }, [])

    // origanize search to url format

    // call top words api

    // print top relevant search terms
    return (
        <>
        <div id="recommendation-container"> R
        </div>
        </>
    )
}

export default Recommendations