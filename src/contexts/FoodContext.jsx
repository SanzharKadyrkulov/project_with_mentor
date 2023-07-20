import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API, LIMIT } from "../utils/consts";
import { notify } from "../components/Toastify";
import { useLocation } from "react-router-dom";

const foodContext = createContext();

export function useFoodContext() {
	return useContext(foodContext);
}

const init = {
	dishes: [],
	dish: null,
	pageTotalCount: 1,
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.dishes:
			return { ...state, dishes: action.payload };
		case ACTIONS.dish:
			return { ...state, dish: action.payload };
		case ACTIONS.pageTotalCount:
			return { ...state, pageTotalCount: action.payload };
		default:
			return state;
	}
}

const FoodContext = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, init);

	async function getDishes() {
		try {
			const { data, headers } = await axios.get(
				`${API}${window.location.search}`
			);

			const totalCount = Math.ceil(headers["x-total-count"] / LIMIT);

			dispatch({
				type: ACTIONS.pageTotalCount,
				payload: totalCount,
			});

			dispatch({
				type: ACTIONS.dishes,
				payload: data,
			});
		} catch (e) {
			notify(`${e.response.status}: ${e.response.statusText}`, "error");
		}
	}

	async function getOneDish(id) {
		try {
			const { data } = await axios.get(`${API}/${id}`);

			dispatch({
				type: ACTIONS.dish,
				payload: data,
			});
		} catch (e) {
			notify(`${e.response.status}: ${e.response.statusText}`, "error");
		}
	}

	async function addDish(newDish) {
		try {
			await axios.post(API, newDish);
			notify("Dish added successfully");
		} catch (e) {
			notify(`${e.response.status}: ${e.response.statusText}`, "error");
		}
	}

	async function deleteDish(id) {
		try {
			await axios.delete(`${API}/${id}`);
			getDishes();
			notify("Successfully deleted");
		} catch (e) {
			notify(`${e.response.status}: ${e.response.statusText}`, "error");
		}
	}

	async function editDish(id, newData) {
		try {
			await axios.patch(`${API}/${id}`, newData);
			notify("Successfully saved changes");
		} catch (e) {
			notify(`${e.response.status}: ${e.response.statusText}`, "error");
		}
	}

	const value = {
		dishes: state.dishes,
		dish: state.dish,
		pageTotalCount: state.pageTotalCount,
		addDish,
		getDishes,
		deleteDish,
		getOneDish,
		editDish,
	};
	return <foodContext.Provider value={value}>{children}</foodContext.Provider>;
};

export default FoodContext;
