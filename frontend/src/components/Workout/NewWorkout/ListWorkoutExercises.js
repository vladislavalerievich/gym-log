import {useDispatch, useSelector} from "react-redux";
import {ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AddWorkoutExerciseDetails from "./AddWorkoutExerciseDetails";
import {deleteExercise} from "../../../redux/slices/workoutSlice";


const ListWorkoutExercises = () => {
    const exercises = useSelector((state) => state.workout.exercises);
    const dispatch = useDispatch();

    return (
        <div className="list-workout-exercises-scroll-container">
            <h6 className="mt-2">Exercises:</h6>
            <ListGroup variant="flush" className="scroll">
                {exercises?.map((exercise, index) =>
                    <ListGroup.Item key={index}>
                        <Row>
                            <Col>
                                <h5>{exercise.name} ({exercise.equipment})</h5>
                            </Col>
                            <Col>
                                <Button
                                    className="float-end"
                                    variant="danger"
                                    size="sm"
                                    onClick={() => dispatch(deleteExercise(index))}
                                >
                                    Delete Exercise
                                </Button>
                            </Col>
                        </Row>
                        <AddWorkoutExerciseDetails exercise={exercise} exerciseIndex={index}/>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default ListWorkoutExercises;
