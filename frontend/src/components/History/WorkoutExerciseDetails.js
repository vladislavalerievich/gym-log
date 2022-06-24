import {useSelector} from "react-redux";
import {ListGroup} from "react-bootstrap";


const WorkoutExerciseDetails = ({exerciseDetails}) => {
    const weightUnit = useSelector((state) => state.auth.weightUnit);

    return (
        <div>
            <ListGroup variant="flush">
                {exerciseDetails?.map(detail =>
                    <ListGroup.Item key={detail.id}>
                        <span>
                            <i>{detail.sets} sets </i>
                            <i className="fa fa-times"/>
                            <i> {detail.reps} reps </i>
                            <i className="fa fa-times"/><i> {detail.weight} {weightUnit}</i>
                        </span>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default WorkoutExerciseDetails;
