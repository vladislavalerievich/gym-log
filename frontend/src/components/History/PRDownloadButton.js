import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {getWorkoutDoc} from "../../api/workoutApi";

const PRDownloadButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await getWorkoutDoc('pr_doc/');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(response);
            link.download = 'personal_records.docx';
            link.click();
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch personal records!');
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <Button variant="primary" onClick={handleDownload} disabled={loading} className="mx-1">
            {loading ? "Loading..." : "Download PR"}
        </Button>
    );
};

export default PRDownloadButton;
