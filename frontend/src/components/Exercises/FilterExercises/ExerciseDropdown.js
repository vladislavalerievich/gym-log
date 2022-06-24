import Dropdown from "react-bootstrap/Dropdown";


const ExerciseDropdown = ({dropdownId, label, items, selected, onSelect}) => {
    return (
        <Dropdown className="d-grid gap-1" onSelect={onSelect}>
            <Dropdown.Toggle id={dropdownId} variant="secondary">{selected}</Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                <Dropdown.Item eventKey={label} active={selected === label}>{label}</Dropdown.Item>
                <Dropdown.Divider/>
                {items?.map((value, index) =>
                    <Dropdown.Item key={index} eventKey={value} active={selected === value}>{value}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ExerciseDropdown;
