import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import MenuPage from "../pages/MenuPage";
import AddFoodPage from "../pages/AddFoodPage";

const MainRoutes = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/menu" element={<MenuPage />} />
				<Route path="/add" element={<AddFoodPage />} />
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default MainRoutes;
