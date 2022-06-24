import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "./Select";
import * as api from "../../../api/exerciseApi";


const NewExerciseModal = (props) => {
    const [exerciseName, setExerciseName] = useState("");
    const [selectedBodyPart, setSelectedBodyPart] = useState("");
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [exerciseDescription, setExerciseDescription] = useState("");

    const queryClient = useQueryClient();
    const bodyParts = queryClient.getQueryData("bodyParts");
    const equipment = queryClient.getQueryData("equipment");

    const createExerciseMutation = useMutation(api.createExercise, {
        onError: (error) => {
            console.error(error);
            toast.error("Could not save exercise.");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries("exercise");
            toast.success(`Exercise: ${data["name"]} is saved!`);
            clear();
        },
    })

    const clear = () => {
        setExerciseName("");
        setSelectedBodyPart("");
        setSelectedEquipment("");
        setExerciseDescription("");
        props.onHide();
    };

    const save = (e) => {
        e.preventDefault();
        const payload = {
            "name": exerciseName.trim(),
            "body_part": selectedBodyPart ? selectedBodyPart : bodyParts?.[0],
            "equipment": selectedEquipment ? selectedEquipment : equipment?.[0],
            "description": exerciseDescription.trim()
        }
        createExerciseMutation.mutate(payload);
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="newExerciseModal" onHide={clear}>
            <Form onSubmit={save}>
                <Modal.Header closeButton>
                    <Modal.Title id="newExerciseModal">
                        Add a new exercise
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="inputExerciseName" className="mb-2">
                        <Form.Label>Exercise name</Form.Label>
                        <Form.Control
                            type="text"
                            name="exerciseName"
                            placeholder="Enter exercise name"
                            value={exerciseName}
                            required
                            onChange={(e) => setExerciseName(e.target.value)}
                        />
                    </Form.Group>

                    <Select
                        label="Body Part"
                        options={bodyParts}
                        selectValue={selectedBodyPart}
                        onSelect={(e) => setSelectedBodyPart(e.target.value)}
                    />

                    <Select
                        label="Equipment"
                        options={equipment}
                        selectValue={selectedEquipment}
                        onSelect={(e) => setSelectedEquipment(e.target.value)}
                    />

                    <Form.Group controlId="inputExerciseDescription">
                        <Form.Label>Exercise description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="exerciseDescription"
                            placeholder="Enter exercise description"
                            value={exerciseDescription}
                            onChange={(e) => setExerciseDescription(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={clear}>Cancel</Button>
                    <Button variant="primary" type="submit">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NewExerciseModal;
