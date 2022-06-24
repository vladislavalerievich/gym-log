import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import NewWorkout from "./NewWorkout";
import {startWorkout} from "../../redux/slices/workoutSlice";


const Workout = () => {
    const workoutStarted = useSelector((state) => state.workout.workoutStarted)
    const dispatch = useDispatch()

    if (workoutStarted) {
        return <NewWorkout/>
    } else {
        return (
            <div className="mt-2">
                <div className="text-center" onClick={() => dispatch(startWorkout())}>
                    <Button variant="primary" size="lg">Start an empty workout</Button>
                </div>
            </div>
        );
    }

};

export default Workout;
