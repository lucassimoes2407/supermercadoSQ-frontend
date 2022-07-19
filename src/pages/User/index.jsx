import { ManageAccountsRounded } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, Chip, Container, createTheme, CssBaseline, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import CopyrightDevHub from "../../components/CopyrightDevHub";
import { getProductByUserCod } from "../../services/product";
import { getAllRestrictions } from "../../services/restriction";
import { getUserByUserId } from "../../services/users";

const User = () => {
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
	const [restrictionsSelected, setRestrictionsSelected] = useState([]);
	const [restrictions, setRestrictions] = useState([
		'Oliver Hansen',
		'Van Henry',
		'April Tucker',
		'Ralph Hubbard',
		'Omar Alexander',
		'Carlos Abbott',
		'Miriam Wagner',
		'Bradley Wilkerson',
		'Virginia Andrews',
		'Kelly Snyder'
	]);
	useEffect(() => {
		(async () => {
			let getRestrictionResponse = await getAllRestrictions();
			setRestrictions(getRestrictionResponse.data.map(restriction => restriction.nome_restricao));
		})();
	}, []);

	const theme = createTheme();
	const handleSaveChanges = () => {
		//TODO - SAVE CHANGES ON PROFILE
	}

	const [user, setUser] = useState({
		user: {},
		userRestrictions: {},
		products: []
	});
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");


	const params = useParams();

	useEffect(() => {
		console.log(user);
	}, [user])

	useEffect(() => {
		try {
			(async () => {
				const getUser = await getUserByUserId(params.cod_usuario);
				const getProducts = await getProductByUserCod(params.cod_usuario);

				const userData = getUser.data.user;
				const restrictions = getUser.data.userRestrictions;
				const products = getProducts.data.productList;

				setEmail(userData.email)
				setUsername(userData.username)
				setUser({ ...userData, restrictions, products })
			})();
		} catch (e) {
			console.log(e);
		}
	}, [params]);

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

					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<ManageAccountsRounded />
					</Avatar>
					<Typography component="h1" variant="h5">Bem vindo {user.username}
					</Typography>

					<Box
						component="form"
						noValidate
						onSubmit={(e) => handleSaveChanges(e)}
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

							<Grid item xs={12}>
								<FormControl fullWidth={true}>
									<InputLabel id="demo-multiple-checkbox-label">Restrições</InputLabel>
									<Select
										fullWidth
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={restrictionsSelected}
										onChange={handleChange}
										input={<OutlinedInput label="Restrições" />}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={MenuProps}
									>
										{restrictions.length > 0 && restrictions.map((nome_restricao) => (
											<MenuItem key={nome_restricao} value={nome_restricao}>
												<Checkbox checked={restrictionsSelected.indexOf(nome_restricao) > -1} />
												<ListItemText primary={nome_restricao} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} container justifyContent={'center'} gap={1}>

								{restrictionsSelected.map((element) => {
									return (
										<div className="restriction__item">
											<Chip
												onDelete={() => { }}
												label={element}
												color="primary"
											/>
										</div>
									)
								})}
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