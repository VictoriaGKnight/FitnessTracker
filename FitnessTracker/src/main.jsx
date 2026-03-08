/*
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./styles/global.css";
import { WorkoutProvider } from "./context/WorkoutContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WorkoutProvider>
  </React.StrictMode>
);
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./styles/global.css";
import { WorkoutProvider } from "./context/WorkoutContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkoutProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WorkoutProvider>
    </AuthProvider>
  </React.StrictMode>
);