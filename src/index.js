import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

ReactDOM.render(
    <BrowserRouter basename="/">
        <Suspense
            fallback={
                <div className="text-center m-5 text-uppercase">Loading...</div>
            }>
            <App />
        </Suspense>
    </BrowserRouter>,
    document.getElementById("root")
);
