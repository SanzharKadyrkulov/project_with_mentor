import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFoodContext } from "../contexts/FoodContext";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddFoodPage() {
	const { addDish } = useFoodContext();
	const [formValue, setFormValue] = useState({
		title: "",
		composition: "",
		price: "",
		image: "",
		category: "",
	});

	function handleChange(e) {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			!formValue.title.trim() ||
			!formValue.composition.trim() ||
			!formValue.price.trim() ||
			!formValue.image.trim() ||
			!formValue.category.trim()
		) {
			return;
		}

		addDish({ ...formValue, price: +formValue.price });

		setFormValue({
			title: "",
			composition: "",
			price: "",
			image: "",
			category: "",
		});
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h5">
						New Dish
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Title"
							name="title"
							autoFocus
							value={formValue.title}
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="composition"
							label="Composition"
							value={formValue.composition}
							onChange={handleChange}
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							name="price"
							label="Price"
							type="number"
							value={formValue.price}
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="image"
							label="Image"
							value={formValue.image}
							onChange={handleChange}
						/>

						<FormControl fullWidth>
							<InputLabel>Category</InputLabel>
							<Select
								value={formValue.category}
								onChange={handleChange}
								label="Category"
								name="category"
							>
								<MenuItem value={"salad"}>Salad</MenuItem>
								<MenuItem value={"soup"}>Soup</MenuItem>
								<MenuItem value={"fastFood"}>FastFood</MenuItem>
								<MenuItem value={"mainDish"}>Main Dish</MenuItem>
								<MenuItem value={"drink"}>Drink</MenuItem>
								<MenuItem value={"dessert"}>Dessert</MenuItem>
							</Select>
						</FormControl>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Add New Dish
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
