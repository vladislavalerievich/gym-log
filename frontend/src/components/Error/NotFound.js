import React from "react";
import {Link} from "react-router-dom";


const NotFound = () => (
    <div className="text-center mt-5">
        <h1>404 Not Found</h1>
        Go to <Link to="/login">Log In</Link>
    </div>
);

export default NotFound;
