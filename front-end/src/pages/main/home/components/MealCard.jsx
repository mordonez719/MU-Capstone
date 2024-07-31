/*

MealCard.jsx

Displays a meal plan's title.

Calls: 
Called In: AllMealPlans

*/

import './MealCard.css'

function MealCard(props){
    // changes pop-up state on card click, takes id to populate pop-up
    function openModal(id) {
        props.setModalID(id);
        props.toggleModal(1);
    }

    return (
        <>
            <div className="card" onClick={() => openModal(props.id)}>
                <div className="all-content">
                    <div className="back">
                    <div className="back-content">
                        {props.creator ? <span class="material-symbols-outlined" id="meal-icon">diversity_3</span>
                        : <span class="material-symbols-outlined" id="meal-icon">restaurant</span>}                        
                        <strong>{props.title}</strong>
                        <strong>{props.creator}</strong>
                    </div>
                    </div>
                    <div className="front">
                    
                    <div className="img">
                        <div className="circle">
                        </div>
                        <div className="circle" id="right">
                        </div>
                        <div className="circle" id="bottom">
                        </div>
                    </div>

                    <div className="front-content">
                        <small className="badge">Meal Plan</small>
                        <div className="description">
                        <div className="title">
                            <p className="title">
                            <strong>{props.title}</strong>
                            </p>
                            <svg fillRule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g style={{mixBlendmode: "normal"}} textAnchor="none" fontSize="none" fontWeight="none" fontFamily="none" strokeDashoffset="0" strokeDasharray="" strokeMiterlimit="10" strokeLinejoin="miter" strokeLinecap="butt" strokeWidth="1" stroke="none" fillRule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg>
                        </div>
                        <p className="card-footer">
                            Click for more details
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MealCard