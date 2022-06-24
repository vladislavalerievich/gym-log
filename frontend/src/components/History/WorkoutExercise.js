import {ListGroup} from "react-bootstrap";
import WorkoutExerciseDetails from "./WorkoutExerciseDetails";

const WorkoutExercise = ({exercises}) => {
    return (
        <div>
            <h6 className="mt-2">Exercises:</h6>
            <ListGroup variant="flush">
                {exercises?.map(exercise =>
                    <ListGroup.Item key={exercise.id}>
                        <h6>{exercise.name}</h6>
                        <WorkoutExerciseDetails exerciseDetails={exercise?.["workout_exercise_details"]}/>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default WorkoutExercise;
