import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import MenuPage from "../pages/MenuPage";
import AddFoodPage from "../pages/AddFoodPage";
import EditFoodPage from "../pages/EditFoodPage";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import CartPage from "../pages/CartPage";
import SuccessPage from "../pages/SuccessPage";

const MainRoutes = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/menu" element={<MenuPage />} />

				<Route element={<ProtectedRoute />}>
					<Route path="/cart" element={<CartPage />} />
				</Route>

				<Route element={<AdminProtectedRoute />}>
					<Route path="/add" element={<AddFoodPage />} />
					<Route path="/edit/:id" element={<EditFoodPage />} />
				</Route>
			</Route>

			<Route path="/auth" element={<AuthPage />} />
			<Route path="/success" element={<SuccessPage />} />

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default MainRoutes;
