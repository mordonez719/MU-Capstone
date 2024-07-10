/*

UserResults.jsx

Fetches and displays the user with a username matching the current user's search.
Searches are exact. 

Calls: UserCard
Called In: FriendsPage

*/

import UserCard from './UserCard';
import './UserResults.css'
import { useState } from 'react'

function UserResults(){
    const [searchQuery, setSearchQuery] = useState("");
    const [found, setFound] = useState();

    const fetchUser = async (query) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/users/query/${query}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(query)
    const data = await response.json()
    setFound(data);
    };

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        setFound(undefined);
    };

    const handleSearch = () => {
        fetchUser(searchQuery);
    }

    let friend = <></>;

    if (found){
        friend = <UserCard name={found.user} />
    }

    return (
        <>
            <section id="searcher">
                <span className="material-symbols-outlined" onClick={() => handleSearch()}>search</span>
                <input id="search-bar" type="text" value={searchQuery} 
                onChange={(e) => handleSearchChange(e.target.value)} 
                placeholder="Search Users..." />
            </section>
            {found ? <section id="user-result">
                    {friend}
                    </section>
                    : ""
            }
        </>
    )
}

export default UserResults