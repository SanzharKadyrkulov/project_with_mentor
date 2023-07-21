import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import FoodContext from "./contexts/FoodContext";
import Toastify from "./components/Toastify";
import AuthContext from "./contexts/AuthContext";
import CartContext from "./contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<AuthContext>
			<CartContext>
				<FoodContext>
					<Toastify />
					<App />
				</FoodContext>
			</CartContext>
		</AuthContext>
	</BrowserRouter>
);
