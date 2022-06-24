import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    authenticated: false,
    weightUnit: null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const {access, refresh} = action.payload;
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            state.authenticated = true
        },
        updateWeightUnit: (state, action) => {
            state.weightUnit = action.payload;
        },
    },
})

export const {
    login,
    updateWeightUnit
} = authSlice.actions;

export default authSlice.reducer;