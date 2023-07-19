import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { notify } from "../components/Toastify";

const ProtectedRoute = () => {
	const { user } = useAuthContext();

	if (!user) {
		notify("Please login to access this page", "default");
		return <Navigate to="/auth" />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
