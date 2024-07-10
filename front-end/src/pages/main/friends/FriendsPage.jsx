/*

FriendsPage.jsx

Page for users to search and add other users. Users can search for another
user by name. If two users mutually add each other they can view eachother's
workouts and meal plans.

Calls: UserResults
Called In: MainPage

*/

import './FriendsPage.css'
import UserResults from './components/UserResults'

function FriendsPage(props){
    return (
        <>
        <h2>Manage Friends Here</h2>
        <div id="user-search-container">
            <UserResults />
        </div>
        </>
    )
}

export default FriendsPage