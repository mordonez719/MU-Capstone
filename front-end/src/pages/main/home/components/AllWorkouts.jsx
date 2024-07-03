import './AllWorkouts.css'
import CreateWorkout from '../../workouts/components/CreateWorkout'
import { useState } from 'react';

function AllWorkouts(){
    const [form, setForm] = useState(0);

    return (
    <>
        <section id="all-workouts">
        <button id="create-wk" onClick={() => setForm(1)}>Create a Workout</button>
        </section>
        <CreateWorkout form={form} setForm={setForm}/>
    </>
    )
}

export default AllWorkouts