import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {pageRoutes} from "../utils/routes";

const NavigationBar = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);
    const authenticated = useSelector((state) => state.auth.authenticated)

    useEffect(() => {
        // Location is needed to highlight the navigation link if page is reloaded by the user.
        setActiveTab(location.pathname);
    }, [location]);

    return authenticated && (
        <Navbar variant="light" bg="light" sticky="top">
            <Nav
                fill
                variant="tabs"
                className="w-100"
                activeKey={activeTab}
                onSelect={(value) => setActiveTab(value)}
            >

                <Nav.Item>
                    <Nav.Link as={Link} to={pageRoutes.profile} eventKey={pageRoutes.profile}>
                        Profile
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to={pageRoutes.workout} eventKey={pageRoutes.workout}>
                        Workout
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to={pageRoutes.history} eventKey={pageRoutes.history}>
                        History
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link as={Link} to={pageRoutes.exercises} eventKey={pageRoutes.exercises}>
                        Exercises
                    </Nav.Link>
                </Nav.Item>

            </Nav>
        </Navbar>
    );
};

export default NavigationBar;
