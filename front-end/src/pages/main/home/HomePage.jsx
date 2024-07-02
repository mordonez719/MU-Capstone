import './HomePage.css'
import AllMealPlans from './components/AllMealPlans'
import AllWorkouts from './components/AllWorkouts'

function HomePage() {
    return (
        <div id="home-content">
            <h3>Your Workouts: </h3>
            <AllWorkouts />
            <br></br>
            <h3>Your Meal Plans: </h3>
            <AllMealPlans />
            {/* {props.user} */}
        </div>
    )
}

export default HomePage

