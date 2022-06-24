import React from "react";
import ReactDOM from "react-dom";
import {QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./redux/store";
import {queryClient} from "./api/instances/queryClient";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import App from "./App";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);