import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCartContext } from "../contexts/CartContext";
import { Box, Button, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function CartPage() {
	const { cart, getCart, increaseCount, decreaseCount, deleteDishFromCart } =
		useCartContext();

	React.useEffect(() => {
		getCart();
	}, []);

	if (cart.dishes.length < 1) {
		return (
			<Box
				sx={{
					maxWidth: "max-content",
					margin: "100px auto",
					textAlign: "center",
				}}
			>
				<Typography variant="h4">Cart is empty</Typography>
				<Button component={Link} to="/menu">
					Go to menu
				</Button>
			</Box>
		);
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell align="right">Image</TableCell>
						<TableCell align="right">Category</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Sub Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{cart.dishes.map((item) => (
						<TableRow
							key={item.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{item.title}
							</TableCell>
							<TableCell align="right">
								<img width={30} src={item.image} alt="" />
							</TableCell>
							<TableCell align="right">{item.category}</TableCell>
							<TableCell align="right">{item.price}</TableCell>
							<TableCell align="right">{item.subPrice.toFixed(2)}</TableCell>
							<TableCell sx={{ display: "flex", alignItems: "center" }}>
								<IconButton
									onClick={() => {
										if (item.count <= 1) {
											deleteDishFromCart(item.id);
										} else {
											decreaseCount(item.id);
										}
									}}
								>
									<RemoveIcon color="primary" />
								</IconButton>
								<Typography component={"span"} variant="h6">
									{item.count}
								</Typography>
								<IconButton onClick={() => increaseCount(item.id)}>
									<AddIcon color="primary" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0 40px",
				}}
			>
				<Typography variant="h4">
					Total price: ${cart.totalPrice.toFixed(2)}
				</Typography>
				<Button component={Link} to="/success" variant="contained">
					Order
				</Button>
			</Box>
		</TableContainer>
	);
}
