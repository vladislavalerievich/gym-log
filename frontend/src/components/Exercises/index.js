import {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import NewExerciseModal from "./NewExerciseModal";
import FilterExercises from "./FilterExercises";
import ViewExercises from "./FilterExercises/ViewExercises";


const Exercises = () => {
    const [showNewExerciseModal, setShowNewExerciseModal] = useState(false);

    return (
        <div className="mt-2">
            <NewExerciseModal
                show={showNewExerciseModal}
                onHide={() => setShowNewExerciseModal(false)}
            />

            <Stack gap={2}>
                <Row>
                    <Col>
                        <h2>Exercises</h2>
                    </Col>
                    <Col>
                        <Button
                            className="float-end"
                            size="lg"
                            variant="primary"
                            onClick={() => setShowNewExerciseModal(true)}
                        >
                            New
                        </Button>
                    </Col>
                </Row>

                <FilterExercises RenderExercises={ViewExercises}/>
            </Stack>
        </div>
    );
};

export default Exercises;
