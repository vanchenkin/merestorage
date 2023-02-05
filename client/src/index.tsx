import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { App } from "./components/App/App";
// import { ErrorHandler } from './components/ErrorHandler/ErrorHandler';
// import { Notifications } from './components/Notifications/Notifications';

import { Store } from "./store/store";

import "./reset.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
    <Provider store={Store}>
        {/* <ErrorHandler /> */}
        <BrowserRouter>
            <App />
            {/* <Notifications /> */}
        </BrowserRouter>
    </Provider>
);
