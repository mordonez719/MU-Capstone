/*

UserCard.jsx

Displays the given user's name. Adds interaction to send or accept friend request
or confirm friendship.

Calls: 
Called In: UserResults, FriendsPage

*/

import './UserCard.css'

function UserCard(props){

    // sends a friend request from the current user to the user associated with the button pressed
    const handleSend = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/friends/send`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                "targetName": (props.name)
                }),
        }
        )
    }

    // cancels a friend request sent by the current user to the user associated with the button pressed
    const handleCancel = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/friends/cancel`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                "targetName": (props.name)
                }),
        }
        )
    }
    
    // accepts a friend request, updates the two associated users to be friends and removes the request
    const handleAccept = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/friends/accept`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                "targetName": (props.name)
                }),
        }
        )
    }

    // denies a friend request, removing the request
    const handleDeny = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/friends/deny`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                "targetName": (props.name)
                }),
        }
        )
    }

    // removes users from eachother's friends lists
    const handleRemove = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/friends/remove`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                "targetName": (props.name)
                }),
        }
        )
    }

    // default button to send a friend request
    let button = <button className='result-status' onClick={handleSend}>Add</button>

    // determines type of button and it's necessary action based on the current relationship
    if (props.status === "sent") { // if request has been sent, user can cancel
        button = <button className='result-status' onClick={handleCancel}>Cancel</button>
    } else if (props.status === "received") { // if request was received, user can accept or deny
        button = <>
                <button className='result-status' onClick={handleAccept}>Accept</button>
                <button className='result-status' onClick={handleDeny}>Deny</button>
                </>
    } else if (props.status === "friend") { // if already friends, user can remove
        button = <button className='result-status' onClick={handleRemove}>Remove</button>
    } else if (props.status === "self") {
        button = <></>
    }


    return(
        <section className='user-back'>
            <section id="result-username">
                <h4 id="result-user">{props.name}</h4>
            </section>
            <section className='status-button'>
                {button}
            </section>
        </section>
    )
}

export default UserCard
