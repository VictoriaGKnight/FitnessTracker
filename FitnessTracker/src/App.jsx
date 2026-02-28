import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Explore from "./pages/Explore.jsx";
import Builder from "./pages/Builder.jsx";
import Log from "./pages/Log.jsx";
import Progress from "./pages/Progress.jsx";

function NotFound() {
  return (
    <div className="container">
      <h2>404 - Page Not Found</h2>
      <p>This page doesn’t exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/log" element={<Log />} />
          <Route path="/progress" element={<Progress />} />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}


