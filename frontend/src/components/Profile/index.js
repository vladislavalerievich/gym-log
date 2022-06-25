import {useMutation, useQueryClient} from "react-query";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";
import * as profileApi from "../../api/profileApi";
import * as authApi from "../../api/authApi";
import {timestampToString} from "../../utils/helpers";
import {updateWeightUnit} from "../../redux/slices/authSlice";


const Profile = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const weightUnit = useSelector((state) => state.auth.weightUnit)
    const profileData = queryClient.getQueryData("profile");

    const updateProfileMutation = useMutation(profileApi.updateProfile, {
        onSuccess: (data) => {
            const weightSystem = data["weight_system"];
            dispatch(updateWeightUnit(weightSystem));
            queryClient.invalidateQueries("profile");
            toast.success(`Weight unit: ${weightSystem} is saved!`);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Could not update weight unit system!");
        },
    });

    const handleWeightUnitChange = (value) => {
        const payload = {"weight_system": value};
        updateProfileMutation.mutate(payload);
    };

    const logoutMutation = useMutation(authApi.blacklist, {
        onSettled: () => {
            dispatch({type: "CLEAR_SESSION"});
        },
    });

    return (
        <div className="mt-2">
            <h2 className="text-center">Profile</h2>
            <div className="mt-3"><strong>Email: </strong>{profileData?.["email"]}</div>
            <div className="mt-3"><strong>Username: </strong>{profileData?.["username"]}</div>
            <div className="mt-3">
                <strong>Weight unit:</strong>
                <ToggleButtonGroup
                    name="metric-system"
                    type="radio"
                    value={weightUnit}
                    size="sm"
                    className="mx-1"
                    onChange={handleWeightUnitChange}
                >
                    <ToggleButton
                        id="btn-kg"
                        variant={weightUnit === "kg" ? "primary" : "secondary"}
                        value="kg"
                    >
                        Metric (kg)
                    </ToggleButton>
                    <ToggleButton
                        id="btn-lbs"
                        variant={weightUnit === "lbs" ? "primary" : "secondary"}
                        value="lbs"
                    >
                        Imperial (lbs)
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="mt-2"><strong>Account created: </strong>{timestampToString(profileData?.["created"])}</div>

            <div className="mt-3 text-center">
                <Button variant="danger" size="lg" onClick={() => logoutMutation.mutate()}>Log out</Button>
            </div>
        </div>
    );
};

export default Profile;
