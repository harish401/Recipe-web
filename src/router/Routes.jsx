import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../context/Auth";
import { Box } from "@mui/material";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Create from "../pages/Create";

const AppRouter = () => {
  const { sessionToken } = useAuth();
  const [cookies] = useCookies(["userId"]);
  const isAuthenticated = cookies.accessToken || sessionToken;
const navigate =useNavigate()
  useEffect(() => {
    // Check if session token exists in local storage
    const storedSessionToken = localStorage.getItem("userId");
    if (storedSessionToken) {
      // Navigate to Home page if session token exists
      navigate("/Home");
    }
  }, []); // Run this effect only once on component mount

  return (
    <Box>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/Home" /> : <Navigate to="/Login" />
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        {/* Add additional routes as needed */}
      </Routes>
    </Box>
  );
};

export default AppRouter;
