import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import authReducer from './slices/authSlice';
import workoutReducer from './slices/workoutSlice';


const reducers = combineReducers({
    auth: authReducer,
    workout: workoutReducer
});

const rootReducer = (state, action) => {
    // Clear all data in redux store to initial.
    if (action.type === "CLEAR_SESSION") {
        state = undefined;
        localStorage.clear();
    }

    return reducers(state, action);
};

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;