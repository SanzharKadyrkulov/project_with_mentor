import React, { useEffect } from "react";
import { useFoodContext } from "../contexts/FoodContext";
import FoodItem from "./FoodItem";
import { Box, CircularProgress } from "@mui/material";

const FoodList = () => {
	const { dishes, getDishes } = useFoodContext();

	useEffect(() => {
		getDishes();
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "30px",
				alignItems: "center",
				mt: 5,
			}}
		>
			{dishes.length > 0 ? (
				dishes.map((item) => <FoodItem key={item.id} item={item} />)
			) : (
				<CircularProgress
					sx={{ mx: "auto", mt: 5, display: "block" }}
					size={200}
				/>
			)}
		</Box>
	);
};

export default FoodList;
