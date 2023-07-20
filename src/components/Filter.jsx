import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSearchParams } from "react-router-dom";
import { useFoodContext } from "../contexts/FoodContext";
import { LIMIT } from "../utils/consts";

export default function Filter() {
	const { setPage } = useFoodContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [category, setCategory] = React.useState(
		searchParams.get("category") || "all"
	);

	const handleChange = (_, value) => {
		value && setCategory(value);
	};

	React.useEffect(() => {
		const currentParams = Object.fromEntries([...searchParams]);

		if (category === "all") {
			const { _page, q } = currentParams;
			setSearchParams({
				_limit: LIMIT,
				_page: _page || 1,
				q: q || "",
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
