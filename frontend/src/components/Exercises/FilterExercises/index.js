import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExerciseDropdown from "./ExerciseDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as exerciseApi from "../../../api/exerciseApi";


const ANY_BODY_PART = "Any Body Part";
const ANY_EQUIPMENT = "Any Equipment";


const FilterExercises = ({RenderExercises, handleSelect}) => {
    const [visibleExercises, setVisibleExercises] = useState(null);
    const [input, setInput] = useState("");
    const [selectedBodyPart, setSelectedBodyPart] = useState(ANY_BODY_PART);
    const [selectedEquipment, setSelectedEquipment] = useState(ANY_EQUIPMENT);

    const {data: exercises} = useQuery('exercise', exerciseApi.getExercises);

    const queryClient = useQueryClient();
    const bodyParts = queryClient.getQueryData("bodyParts");
    const equipment = queryClient.getQueryData("equipment");

    useEffect(() => {
        let filteredExercises = exercises?.filter(obj => obj.name.toLowerCase().includes(input.toLowerCase()))
        if (selectedBodyPart !== ANY_BODY_PART)
            filteredExercises = filteredExercises.filter(obj => obj.body_part === selectedBodyPart);
        if (selectedEquipment !== ANY_EQUIPMENT)
            filteredExercises = filteredExercises.filter(obj => obj.equipment === selectedEquipment);
        setVisibleExercises(filteredExercises);
    }, [exercises, input, selectedBodyPart, selectedEquipment]);

    return (
        <>
            <Form>
                <Form.Group className="mb-2" controlId="search-exercises">
                    <InputGroup>
                        <InputGroup.Text>
                            <i className="fas fa-search"/>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
            </Form>

            <Row>
                <Col>
                    <ExerciseDropdown
                        dropdownId="dropdown-body-part"
                        label={ANY_BODY_PART}
                        items={bodyParts}
                        selected={selectedBodyPart}
                        onSelect={setSelectedBodyPart}
                    />
                </Col>
                <Col>
                    <ExerciseDropdown
                        dropdownId="dropdown-equipment"
                        label={ANY_EQUIPMENT}
                        items={equipment}
                        selected={selectedEquipment}
                        onSelect={setSelectedEquipment}
                    />
                </Col>
            </Row>

            <RenderExercises exercises={visibleExercises} handleSelect={handleSelect}/>
        </>
    );
};

export default FilterExercises;