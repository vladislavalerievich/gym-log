import {useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FilterExercises from "../../Exercises/FilterExercises";
import SelectExercises from "../../Exercises/FilterExercises/SelectExercises";
import {addExercises} from "../../../redux/slices/workoutSlice";


const AddExercisesModal = (props) => {
    const [selectedExercises, setSelectedExercises] = useState([]);
    const dispatch = useDispatch()

    const close = () => {
        setSelectedExercises([]);
        props.onHide();
    }

    const handleSelect = (e) => {
        const {id, checked} = e.target;
        if (checked) {
            setSelectedExercises(prevState => [...prevState, parseInt(id)])
        } else {
            setSelectedExercises(prevState => prevState.filter(i => parseInt(i) !== id))
        }
    }

    const handleAddExercises = () => {
        if (selectedExercises.length < 1) {
            toast.error("You did not selected an Exercise!");
            return;
        }
        dispatch(addExercises(selectedExercises));
        close();
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="selectExerciseEodal" onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title id="selectExerciseEodal">
                    Select an exercise
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FilterExercises RenderExercises={SelectExercises} handleSelect={handleSelect}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancel</Button>
                <Button variant="primary" onClick={handleAddExercises}>Add</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default AddExercisesModal;
