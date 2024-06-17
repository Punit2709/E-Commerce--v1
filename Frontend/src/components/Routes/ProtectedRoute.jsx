import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";


const ProtectedRoute = ({ isAdmin, element }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user)
  

  if (loading) return <Loader />;

  if (!loading && !isAuthenticated) {
    
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/account" />;
  }

  return element;
};

export default ProtectedRoute;
