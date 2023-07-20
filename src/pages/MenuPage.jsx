import React, { useState } from "react";
import FoodList from "../components/FoodList";
import { Box, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { LIMIT } from "../utils/consts";
import { useFoodContext } from "../contexts/FoodContext";

const MenuPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { getDishes } = useFoodContext();

	useEffect(() => {
		getDishes();
	}, [searchParams]);

	const [page, setPage] = useState(1);

	useEffect(() => {
		setSearchParams({
			_page: page,
			_limit: LIMIT,
		});
	}, [page]);

	return (
		<div>
			<FoodList />
			<Box sx={{ maxWidth: "max-content", margin: "30px auto" }}>
				<Pagination
					count={10}
					page={page}
					onChange={(_, val) => setPage(val)}
					color="primary"
				/>
			</Box>
		</div>
	);
};

export default MenuPage;
