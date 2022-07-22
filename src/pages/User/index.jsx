import { ManageAccountsRounded, Close } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Checkbox, Chip, Container, createTheme, CssBaseline, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography, } from "@mui/material";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import RestoreIcon from '@mui/icons-material/Restore';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import FilterInputForEdit from "../../components/FilterInputForEdit";
import { getProductByUserCod } from "../../services/product";
import { getAllRestrictions } from "../../services/restriction";
import { getUserByUserId, updateUser } from "../../services/users";
import { postUserRestriction, deleteUserRestriction } from "../../services/userRestriction";
import { useSnack } from '../../hooks/useSnack';
import React from 'react';

const User = () => {
	const [user, setUser] = useState({
		user: {},
		userRestrictions: {},
		products: []
	});
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [restrictions, setRestrictions] = useState([]);
	const [restrictionsSelected, setRestrictionsSelected] = useState([]);
	const { snack, handleSnackState, handleSnackOpen } = useSnack();

	const theme = createTheme();
	const params = useParams();
	const navigate = useNavigate();
	
	const getAction = (cod_usuario) => {
		if (!cod_usuario) return
		return <React.Fragment>
			<Button
				color="secondary"
				size="small"
				onClick={() => { navigate(`/user/${params.cod_usuario}`) }}
			>
				Ver Usuario
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="secondary"
				onClick={handleSnackOpen}
			>
				<Close fontSize="small" />
			</IconButton>
		</React.Fragment>
	}
	
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

	const getRestrictionCodeByName = useCallback(async (name) => {
		if (!name) return null;
		const allRestrictions = await getAllRestrictions();
		let foundRestriction = allRestrictions.data.find(res => res.nome_restricao === name)
		console.log(foundRestriction);
		return foundRestriction.cod_restricao;
	}, []);

	const handleUpdateRestrictionsSelectedRequest = async () => {
		const getUser = await getUserByUserId(params.cod_usuario)
		const restrictionList = getUser.data.userRestrictions.map(res => res.nome_restricao);
		restrictionList.forEach(async (res) => {
			if (!restrictionsSelected.includes(res)) {
				const codeRestriction = await getRestrictionCodeByName(res);
				await deleteUserRestriction(params.cod_usuario, codeRestriction);
			}
		})
		restrictionsSelected.forEach(async (res) => {
			if (!restrictionList.includes(res)) {
				const codeRestriction = await getRestrictionCodeByName(res);
				await postUserRestriction(params.cod_usuario, codeRestriction);
			}
		})

	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(user);
		const response = await updateUser(
			user.cod_usuario,
			user.username,
			user.email,
			user.senha
		)
		await handleUpdateRestrictionsSelectedRequest();
		if (response.status === 200) {
			handleSnackState(
				{
					...snack,
					action: getAction(params.cod_usuario),
					open: true,
					message: "Usuário atualizado com sucesso!",
				}
			)
			navigate('/');
		}
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
				setPass(userData.senha)
				
				setRestrictionsSelected(
					restrictions.map((restriction) => restriction.nome_restricao));
					
				setUser({ ...userData, restrictions, products });


			})();
		} catch (e) {
			console.log(e);
		}
	}, [params]);

	const handleUserInfoChange = (event, attribute) => {
		const editedUser = structuredClone(user)
		console.log(editedUser);
		editedUser[`${attribute}`] = event.target.value
		setUser(editedUser);
	}

	const handleClear = () => {
		(async () => {
			const getUser = await getUserByUserId(params.cod_usuario);
			if(!getUser || !getUser.data) navigate('/notfound');
			const userData = getUser.data.user;
			let res = getUser.data.userRestrictions;
			setEmail(userData.email);
			setUsername(userData.username);
			setPass(userData.senha)
			setRestrictionsSelected(res.map(restriction => restriction.nome_restricao))
			setUser({ ...userData, restrictions });

		})()
		console.log("DESCARTAR ALTERAÇÕES")//TODO - DISCARD CHANGES ON PROFILE
	}

	const handleUpdateRestrictionsSelected = (selected) => {
		setRestrictionsSelected(selected)
	}
	const getRestrictions = async () => {
		const { data } = await getAllRestrictions();
		setRestrictions(data);
	}
	useEffect(() => {
		getRestrictions();
	}, []);

	useEffect(() => {
		getRestrictions();
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						marginBottom:8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>

					<Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
						<ManageAccountsRounded />
					</Avatar>
					<Typography component="h1" variant="h5">Olá <b>{user.username}</b>, <br/> gerencie seu perfil
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
									value={user && user.username || ''}
									onChange={(e) => {
										handleUserInfoChange(e, 'username');
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									name="email"
									id="email"
									label="E-mail"
									fullWidth
									value={user && user.email || ''}
									onChange={(e) => {
										handleUserInfoChange(e, 'email');
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									name="senha"
									id="standard-password-input"
									type="password"
									label="Senha"
									fullWidth
									value={user && user.senha || ''}
									onChange={(e) => {
										handleUserInfoChange(e, 'senha');
									}}
								/>
							</Grid>

							<Grid item xs={12} >
							{console.log("antes do FilterInputForEdit")}
							<FilterInputForEdit
									selectedItems={restrictionsSelected || []}
									items={restrictions.map(restriction => restriction.nome_restricao) || []}
									title={'Contém'}
									updateSelecteds={handleUpdateRestrictionsSelected}
								/>
							</Grid>

							<Grid item xs={12} container justifyContent="space-around">
								<Button
									variant="outlined"
									color="secondary"
									sx={{ mt: 3, mb: 2, width: 150 }}
									onClick={handleClear}
									endIcon={<RestoreIcon />}>
									Desfazer
								</Button>

								<Button
									type="submit"
									variant="contained"
									sx={{ mt: 3, mb: 2, width: 150 }}
									endIcon={<SaveAsIcon/>}
								>
									Salvar
								</Button>
							</Grid>
						</Grid>

					</Box>
				</Box>

			</Container>
		</ThemeProvider>

	)
}

export default User;