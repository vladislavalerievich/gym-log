import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form'


const SelectExercises = ({exercises, handleSelect}) => {
    return (
        <Form onChange={handleSelect}>
            <ListGroup variant="flush" className="select-scroll-container">
                {exercises?.map(exercise =>
                    <ListGroup.Item key={exercise.id}>
                        <Form.Group>
                            <Form.Check id={exercise.id}>
                                <Form.Check.Input type="checkbox"/>
                                <Form.Check.Label>
                                    <h6>{exercise.name} ({exercise.equipment})</h6>
                                    <span>{exercise.body_part}</span>
                                    <div className="text-secondary">{exercise.description}</div>
                                </Form.Check.Label>
                            </Form.Check>
                        </Form.Group>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Form>
    );
};

export default SelectExercises;
