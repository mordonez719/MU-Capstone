import './MealCard.css'

function MealCard(props){
    return (
        <section className="meal-card-back">
            <span>
                <img href={props.img} className='meal-pic' />
            </span>
                <span>
                    <h2>{props.name}</h2>
                    <h6>{props.calories}</h6>
                </span>
        </section>
    )
}

export default MealCard