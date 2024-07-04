import './AllWorkouts.css'
import { useState } from 'react';
import WorkoutCard from './WorkoutCard';

function AllWorkouts(){
    return (
    <>
        <section id="all-workouts">
            <WorkoutCard />
            <WorkoutCard />
            <WorkoutCard />
        </section>
    </>
    )
}

export default AllWorkouts