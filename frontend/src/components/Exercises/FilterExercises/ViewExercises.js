import ListGroup from "react-bootstrap/ListGroup";


const ViewExercises = ({exercises}) => {
    return (
        <ListGroup variant="flush" className="view-scroll-container">
            {exercises?.map(exercise =>
                <ListGroup.Item key={exercise.id}>
                    <h6>{exercise.name} ({exercise.equipment})</h6>
                    <span>{exercise.body_part}</span>
                    <div className="text-secondary">{exercise.description}</div>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default ViewExercises;
