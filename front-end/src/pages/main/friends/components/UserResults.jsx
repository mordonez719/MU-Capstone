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

    // finds the user with a name matching the given search query
    const fetchUser = async (query) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/users/query/${query}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
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
    
    // sets default relation so user can send a friend request
    let relation = "new"

    // populates result display if a user was found
    if (found){
        friend = <UserCard class="searched" name={found.user} status={relation}/>
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