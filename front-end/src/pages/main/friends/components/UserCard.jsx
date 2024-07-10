/*

UserCard.jsx

Displays the given user's name. Adds interaction to send or accept friend request
or confirm friendship.

Calls: 
Called In: UserResults

*/

import './UserCard.css'

function UserCard(props){
    return(
        <section className='user-back'>
            <section id="result-username">
                <h4 id="result-user">{props.name}</h4>
            </section>
            <section className='status-button'>
                <button className='result-status'>Add</button>
            </section>
        </section>
    )
}

export default UserCard
