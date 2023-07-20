import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSearchParams } from "react-router-dom";
import { useFoodContext } from "../contexts/FoodContext";

export default function Filter() {
	const { setPage } = useFoodContext();
	const [category, setCategory] = React.useState("all");
	const [searchParams, setSearchParams] = useSearchParams();

	const handleChange = (_, value) => {
		value && setCategory(value);
	};

	React.useEffect(() => {
		const currentParams = Object.fromEntries([...searchParams]);

		if (category === "all") {
			const { _limit, _page, q } = currentParams;
			setSearchParams({
				_limit,
				_page,
				// q,
			});
		} else {
			setSearchParams({
				...currentParams,
				category,
			});
			setPage(1);
		}
	}, [category]);

	return (
		<ToggleButtonGroup
			color="primary"
			value={category}
			exclusive
			onChange={handleChange}
			aria-label="Platform"
		>
			<ToggleButton value="all">All</ToggleButton>
			<ToggleButton value="salad">Salad</ToggleButton>
			<ToggleButton value="soup">Soup</ToggleButton>
			<ToggleButton value="fastFood">FastFood</ToggleButton>
			<ToggleButton value="mainDish">Main Dish</ToggleButton>
			<ToggleButton value="drink">Drink</ToggleButton>
			<ToggleButton value="dessert">Dessert</ToggleButton>
		</ToggleButtonGroup>
	);
}
