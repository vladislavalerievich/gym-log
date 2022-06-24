import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const Select = ({label, selectValue, onSelect, options}) => {
    return (
        <Form.Group className="mb-2">
            <Form.Label>{label}</Form.Label>
            <Form.Select
                aria-label="select"
                value={selectValue}
                onChange={onSelect}
            >
                {options?.map((value, index) => <option key={index} value={value}>{value}</option>)}
            </Form.Select>
        </Form.Group>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    selectValue: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.array
};

export default Select;
