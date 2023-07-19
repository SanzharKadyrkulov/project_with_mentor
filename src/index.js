import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import FoodContext from "./contexts/FoodContext";
import Toastify from "./components/Toastify";
import AuthContext from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<AuthContext>
			<FoodContext>
				<Toastify />
				<App />
			</FoodContext>
		</AuthContext>
	</BrowserRouter>
);
