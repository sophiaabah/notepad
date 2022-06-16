import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import NotesPage from "./pages/Notes";
import RegisterPage from "./pages/Register";

import "./style.css";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserInfo={setUserInfo} />} />
        <Route
          path="/register"
          element={<RegisterPage setUserInfo={setUserInfo} />}
        />
        <Route path="/notes" element={<NotesPage userInfo={userInfo} />} />
      </Routes>
    </Router>
  );
}
