import React from "react";
import Drawer2 from "./Components/Drawer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {  useSelector } from "react-redux";
import SignIn from "./Components/SignIn";

function App() {
  const userRoles = useSelector((state) => state.app.Role.loggedInUser);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userRoles.every((role) => role === "X") ? (
              <SignIn />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            userRoles.every((role) => role === "X") ? (
              <Navigate to="/" />
            ) : (
              <Drawer2 />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
