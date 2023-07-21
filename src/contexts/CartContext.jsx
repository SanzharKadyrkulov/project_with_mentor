import React, { createContext, useContext, useState } from "react";
import { notify } from "../components/Toastify";

const cartContext = createContext();

export function useCartContext() {
	return useContext(cartContext);
}

const initState = {
	dishes: [],
	totalPrice: 0,
};

function getDataFromLS() {
	let data = JSON.parse(localStorage.getItem("cart"));
	if (!data) {
		data = {
			dishes: [],
			totalPrice: 0,
		};
	}
	return data;
}

const CartContext = ({ children }) => {
	const [cart, setCart] = useState(initState);

	function getCart() {
		const data = getDataFromLS();
		setCart(data);
	}

	function addDishToCart(dish) {
		const data = getDataFromLS();
		data.dishes.push({ ...dish, count: 1, subPrice: dish.price });

		data.totalPrice = data.dishes.reduce((acc, item) => acc + item.subPrice, 0);

		localStorage.setItem("cart", JSON.stringify(data));
		getCart();
		notify("Successfully added to cart!");
	}

	function deleteDishFromCart(id) {
		const data = getDataFromLS();
		data.dishes = data.dishes.filter((item) => item.id !== id);

		data.totalPrice = data.dishes.reduce((acc, item) => acc + item.subPrice, 0);

		localStorage.setItem("cart", JSON.stringify(data));
		getCart();
		notify("Successfully removed from cart!");
	}

	function isAlreadyInCart(id) {
		const data = getDataFromLS();
		const isInCart = data.dishes.some((item) => item.id === id);
		return isInCart;
	}

	function increaseCount(id) {
		const data = getDataFromLS();

		data.dishes = data.dishes.map((item) => {
			if (item.id === id) {
				item.count += 1;
				item.subPrice += item.price;
			}
			return item;
		});

		data.totalPrice = data.dishes.reduce((acc, item) => acc + item.subPrice, 0);

		localStorage.setItem("cart", JSON.stringify(data));
		getCart();
	}

	function decreaseCount(id) {
		const data = getDataFromLS();

		data.dishes = data.dishes.map((item) => {
			if (item.id === id) {
				item.count -= 1;
				item.subPrice -= item.price;
			}
			return item;
		});

		data.totalPrice = data.dishes.reduce((acc, item) => acc + item.subPrice, 0);

		localStorage.setItem("cart", JSON.stringify(data));
		getCart();
	}

	function clearCart() {
		localStorage.removeItem("cart");
		getCart();
	}

	const value = {
		cart,
		getCart,
		addDishToCart,
		isAlreadyInCart,
		deleteDishFromCart,
		increaseCount,
		decreaseCount,
		clearCart,
	};
	return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export default CartContext;
