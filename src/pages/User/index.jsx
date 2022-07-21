import { ManageAccountsRounded } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, Chip, Container, createTheme, CssBaseline, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ChipsRestrictionsUpdate from "../../components/ChipsRestrictionsUpdate";
import { getProductByUserCod } from "../../services/product";
import { getAllRestrictions } from "../../services/restriction";
import { getUserByUserId } from "../../services/users";

const User = () => {
	const [user, setUser] = useState({
		user: {},
		userRestrictions: {},
		products: []
	});
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [restrictions, setRestrictions] = useState([]);
	const [restrictionsSelected, setRestrictionsSelected] = useState([]);

	const theme = createTheme();
	const params = useParams();

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		console.log(value);
		setRestrictionsSelected(
			typeof value === 'string' ? value.split(',') : value,
		);
	};
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: 48 * 4.5 + 8,
				width: 250,
			},
		},
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Submit");//TODO - SAVE CHANGES ON PROFILE
	}

	useEffect(() => {
		(async () => {
			let getRestrictionResponse = await getAllRestrictions();
			setRestrictions(getRestrictionResponse.data.map(restriction => restriction.nome_restricao));
		})();
	}, []);

	useEffect(() => {
		try {
			(async () => {
				const getUser = await getUserByUserId(params.cod_usuario);
				const getProducts = await getProductByUserCod(params.cod_usuario);

				const userData = getUser.data.user;
				const restrictions = getUser.data.userRestrictions;
				const products = getProducts.data.productList;

				setEmail(userData.email);
				setUsername(userData.username);
				setUser({ ...userData, restrictions, products });

				console.log("WWWWWWWWWW")
				console.log(restrictions)
				console.log(restrictionsSelected)
				setRestrictionsSelected(
					restrictions.map((restriction) => restriction.nome_restricao));



			})();
		} catch (e) {
			console.log(e);
		}
	}, [params]);

	useEffect(() => {
		console.log(user);
	}, [user])
	useEffect(() => {
		console.log(restrictionsSelected);
	}, [restrictionsSelected])


	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>

					<Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
						<ManageAccountsRounded />
					</Avatar>
					<Typography component="h1" variant="h5">Olá <b>{user.username}</b>, edite seu perfil
					</Typography>

					<Box
						component="form"
						noValidate
						onSubmit={(e) => handleSubmit(e)}
						autoComplete="off"

						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									name="username"
									id="username"
									label="Username"
									fullWidth
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									name="email"
									id="email"
									label="E-mail"
									fullWidth
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</Grid>

							<Grid item xs={12} >
								<ChipsRestrictionsUpdate items={restrictions.filter(restriction => !restrictionsSelected.includes(restriction)) || []}
									title={'Suas Restrições'}
									itemsSelected={restrictionsSelected}
									updateSelecteds={(selected) => {
										setRestrictionsSelected(selected);
									}} />
							</Grid>

						</Grid>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Salvar Alterações
						</Button>
					</Box>
				</Box>

			</Container>
		</ThemeProvider>

	)
}

export default User;