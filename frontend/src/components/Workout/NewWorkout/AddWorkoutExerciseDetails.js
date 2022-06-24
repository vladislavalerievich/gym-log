import {useDispatch, useSelector} from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {addExerciseDetails, deleteExerciseDetails, updateExerciseDetails} from "../../../redux/slices/workoutSlice";


const AddWorkoutExerciseDetails = ({exercise, exerciseIndex}) => {
    const dispatch = useDispatch();
    const weightUnit = useSelector((state) => state.auth.weightUnit)

    const handleInputChange = (index, event) => {
        if (event.target.validity.valid) {
            dispatch(updateExerciseDetails({
                exerciseIndex,
                index,
                name: event.target.name,
                value: parseInt(event.target.value)
            }))
        }
    }

    return (
        <Form>
            <ListGroup variant="flush">
                {exercise["workout_exercise_details"].map((input, index) =>
                    <Row key={index} >
                        <Form.Group as={Col} xs={3} className="flex-grow-2">
                            <Form.Label column>Sets:</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                name="sets"
                                value={input.sets}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} xs={3} className="flex-grow-2">
                            <Form.Label column>Reps:</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                max="1000"
                                step="1"
                                name="reps"
                                value={input.reps}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} xs={3} className="flex-grow-2">
                            <Form.Label column>Weight ({weightUnit}):</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                max="1500"
                                step="1"
                                name="weight"
                                value={input.weight}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        </Form.Group>

                        <Col xs={1} className="btn-flex-container">
                            <Button
                                variant="danger"
                                 className="float-end"
                                size="sm"
                                onClick={() => dispatch(deleteExerciseDetails({exerciseIndex, index}))}
                            >
                                <i className="fa fa-times" aria-hidden="true"/>
                            </Button>
                        </Col>
                    </Row>
                )}
            </ListGroup>

            <Button
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => dispatch(addExerciseDetails(exerciseIndex))}
            >
                + Add Set
            </Button>
        </Form>
    );
};

export default AddWorkoutExerciseDetails;
