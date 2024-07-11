/*

FriendsPage.jsx

Page for users to search and add other users. Users can search for another
user by name. If two users mutually add each other they can view eachother's
workouts and meal plans.

Calls: UserResults, UserCard
Called In: MainPage

*/

import './FriendsPage.css'
import UserResults from './components/UserResults'
import { useState, useEffect } from 'react';
import UserCard from './components/UserCard';

function FriendsPage(props){
    const user = props.user;

    // creates three different lists to hold users of different relation
    const [sent, setSent] = useState([]);
    const [received, setReceived] = useState([]);
    const [friends, setFriends] = useState([]);

    // fetches all users associated with the current user and populates the lists
    const fetchFriendData = async (query) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/friendlist`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setSent(data.sent);
        setReceived(data.received);
        setFriends(data.friends);
    };

    useEffect(() => {
        fetchFriendData();
    })

    // initializes array of display cards
    let sent_cards = [];
    let received_cards = [];
    let friend_cards = [];

    // creates a card for each user in data, adds the card to the cards array, and uses type to determine necessary action button
    function make_cards(data, cards, type){
        for (let i = 0; i < data.length; i++){
            let model = data[i];
            if (model){
                cards.push(<UserCard id={i} name={model.user} status={type}/>);
            };
        };
    }

    // makes cards for every data point of each type of relation
    make_cards(sent, sent_cards, "sent");
    make_cards(received, received_cards, "received");
    make_cards(friends, friend_cards, "friend");

    return (
        <>
        <h2>Manage Friends Here</h2>
        <div id="user-search-container">
            <UserResults user={user} sent={sent} received={received} friends={friends}/>
        </div>
        <section id="requests">
            <div className="request-container">
                Sent Requests
                <section className='request-cards'>
                    {sent_cards}
                </section>
            </div>
            <div className="request-container">
                Received Requests
                <section className='request-cards'>
                    {received_cards}
                </section>
            </div>
        </section>
        <section id="friends-container">
            Friends
            <section className='request-cards'>
                {friend_cards}
            </section>
        </section>
        </>
    )
}

export default FriendsPage