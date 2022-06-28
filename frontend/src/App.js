import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "react-query";
import {ToastContainer} from "react-toastify";
import Container from "react-bootstrap/Container";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Workout from "./components/Workout";
import Exercises from "./components/Exercises";
import WorkoutHistory from "./components/History";
import ProtectedRoute from "./components/ProtectedRoute";
import {updateWeightUnit} from "./redux/slices/authSlice";
import {pageRoutes} from "./utils/routes";
import * as exerciseApi from "./api/exerciseApi";
import * as profileApi from "./api/profileApi";


const App = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector((state) => state.auth.authenticated);
    // Fetch initial data that will be used by several components
    useQuery('bodyParts', exerciseApi.getBodyParts, {staleTime: Infinity, enabled: authenticated});
    useQuery('equipment', exerciseApi.getEquipment, {staleTime: Infinity, enabled: authenticated});
    useQuery('profile', profileApi.getProfile, {
        onSuccess: (data) => dispatch(updateWeightUnit(data["weight_system"])),
        enabled: authenticated
    });

    return (
        <div className="App">
            <Router>
                <NavigationBar/>
                <Container className="col-md-6 mx-auto main" fluid="md">
                    <Routes>
                        <Route index path={pageRoutes.login} element={<Login/>}/>
                        <Route path={pageRoutes.register} element={<Register/>}/>
                        <Route path={pageRoutes.profile} element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                        <Route path={pageRoutes.workout} element={<ProtectedRoute><Workout/></ProtectedRoute>}/>
                        <Route path={pageRoutes.history} element={<ProtectedRoute><WorkoutHistory/></ProtectedRoute>}/>
                        <Route path={pageRoutes.exercises} element={<ProtectedRoute><Exercises/></ProtectedRoute>}/>
                        <Route path="*" element={authenticated ? <Navigate to={pageRoutes.workout}/> : <Login/>}/>
                    </Routes>
                </Container>
            </Router>
            <Footer/>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default App;
