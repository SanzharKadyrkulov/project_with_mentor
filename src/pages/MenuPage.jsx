import React, { useState } from "react";
import FoodList from "../components/FoodList";
import { Box, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { LIMIT } from "../utils/consts";
import { useFoodContext } from "../contexts/FoodContext";
import Filter from "../components/Filter";

const MenuPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { getDishes, pageTotalCount, page, setPage } = useFoodContext();

	useEffect(() => {
		getDishes();
	}, [searchParams]);

	useEffect(() => {
		const currentParams = Object.fromEntries([...searchParams]);
		setSearchParams({
			...currentParams,
			_page: page,
			_limit: LIMIT,
		});
	}, [page]);

	return (
		<div>
			<Box sx={{ maxWidth: "max-content", margin: "30px auto" }}>
				<Filter />
			</Box>

			<FoodList />

			<Box sx={{ maxWidth: "max-content", margin: "30px auto" }}>
				<Pagination
					count={pageTotalCount}
					page={page}
					onChange={(_, val) => setPage(val)}
					color="primary"
				/>
			</Box>
		</div>
	);
};

export default MenuPage;
