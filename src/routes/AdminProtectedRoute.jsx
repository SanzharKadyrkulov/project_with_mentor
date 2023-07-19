import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { notify } from "../components/Toastify";

const AdminProtectedRoute = () => {
	const { isAdmin } = useAuthContext();

	if (!isAdmin()) {
		notify("Only admin can access this page", "default");
		return <Navigate to="/" />;
	}

	return <Outlet />;
};

export default AdminProtectedRoute;
