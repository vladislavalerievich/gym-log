import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {getWorkoutDoc} from "../../api/workoutApi";

const WorkoutDownloadButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await getWorkoutDoc('doc/');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(response);
            link.download = 'workout_history.docx';
            link.click();
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch workout history!');
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <Button variant="primary" onClick={handleDownload} disabled={loading}>
            {loading ? "Loading..." : "Download workouts"}
        </Button>
    );
};

export default WorkoutDownloadButton;
