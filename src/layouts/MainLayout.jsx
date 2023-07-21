import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
	// const location = useLocation();

	// function getColor() {
	// 	switch (location.pathname) {
	// 		case "/menu":
	// 			return "red";

	// 		case "/add":
	// 			return "blue";
	// 	}
	// }
	// style={{ backgroundColor: getColor(), minHeight: "100vh" }}
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default MainLayout;
