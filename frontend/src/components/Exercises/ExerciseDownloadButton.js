import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {getExercisesDoc} from "../../api/exerciseApi";
import {toast} from "react-toastify";

const ExerciseDownloadButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await getExercisesDoc();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(response);
            link.download = 'exercises.docx';
            link.click();
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch exercises');
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <Button variant="primary" onClick={handleDownload} disabled={loading}>
            {loading ? "Loading..." : "Download exercises"}
        </Button>
    );
};

export default ExerciseDownloadButton;
