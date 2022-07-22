import { useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, IconButton, TextField, Typography } from "@mui/material";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import RestoreIcon from '@mui/icons-material/Restore';
import "./index.css";
import { getProductByCod, putProduct } from '../../services/product'
import { ThemeProvider } from 'styled-components';
import { useSnack } from '../../hooks/useSnack';
import { useNavigate, useParams } from 'react-router-dom';
import { Close, Edit } from '@mui/icons-material';
import FilterInputForEdit from '../../components/FilterInputForEdit';
import { getAllRestrictions } from '../../services/restriction';
import { deleteProductRestriction, postProductRestriction } from '../../services/produtoRestricao';
import React from 'react';



const EditProduct = () => {
	const [product, setProduct] = useState({ productInfo: {}, user: {}, restrictions: [] });
	const [restrictions, setRestrictions] = useState([]);
	const [restrictionsSelected, setRestrictionsSelected] = useState([]);

	const params = useParams();
	const navigate = useNavigate();
	const theme = createTheme();
	const { snack, handleSnackState, handleSnackOpen } = useSnack();

	const getAction = (cod_produto) => {
		if (!cod_produto) return
		return <React.Fragment>
			<Button
				color="secondary"
				size="small"
				onClick={() => { navigate(`/product/${params.cod}`) }}
			>
				Ver Produto
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

	useEffect(() => {
		try {
			(async () => {
				const getProduct = await getProductByCod(params.cod);
				if (!getProduct || !getProduct.data) navigate('/notfound');
				const product = getProduct.data;
				let res = getProduct.data.restrictions
				setRestrictionsSelected(res.map(restriction => restriction.nome_restricao))
				setProduct(product)
			})();
		} catch (e) {
			console.log(e);
		}
	}, [navigate, params.cod]);

	const getRestrictionCodeByName = useCallback(async (name) => {
		if (!name) return null;
		const allRestrictions = await getAllRestrictions();
		let foundRestriction = allRestrictions.data.find(res => res.nome_restricao === name)
		return foundRestriction.cod_restricao;
	}, []);

	const handleUpdateRestrictionsSelectedRequest = async () => {
		const product = await getProductByCod(params.cod);
		const restrictionList = product.data.restrictions.map(res => res.nome_restricao);
		restrictionList.forEach(async (res) => {
			if (!restrictionsSelected.includes(res)) {
				const codeRestriction = await getRestrictionCodeByName(res);
				await deleteProductRestriction(params.cod, codeRestriction);
			}
		})
		restrictionsSelected.forEach(async (res) => {
			if (!restrictionList.includes(res)) {
				const codeRestriction = await getRestrictionCodeByName(res);
				await postProductRestriction(params.cod, codeRestriction);
			}
		})

	}

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();

			const response = await putProduct(
				product.productInfo.cod_produto,
				product.productInfo.nome,
				product.productInfo.marca,
				product.productInfo.ingredientes,
				null, //FIXME[epic=imagens_produto] imagem por padrão nula
				product.user.cod_usuario,
			);

			if (!product.productInfo.cod_produto) {
				return;
			}

			await handleUpdateRestrictionsSelectedRequest();

			if (response.status === 200) {
				handleSnackState(
					{
						...snack,
						action: getAction(params.cod),
						open: true,
						message: "Produto atualizado com sucesso!",
					}
				)
			}

		} catch (e) {
			handleSnackState(
				{
					...snack,
					open: true,
					message: "Ops, Algo deu errado!"
				}
			);
		}
	};

	const handleProductInfoChange = (event, attribute) => {
		const editedProduct = structuredClone(product)
		editedProduct.productInfo[`${attribute}`] = event.target.value
		setProduct(editedProduct);
	}

	const handleClear = () => {
		(async () => {
			const getProduct = await getProductByCod(params.cod);
			if (!getProduct || !getProduct.data) navigate('/notfound');
			const product = getProduct.data;
			let res = getProduct.data.restrictions;

			setRestrictionsSelected(res.map(restriction => restriction.nome_restricao))
			setProduct(product)
		})()
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

	return (

		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 12,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>

					<Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
						<Edit />
					</Avatar>
					<Typography component="h1" variant="h5">Editar Produto {product.productInfo.nome}</Typography>

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
									name="product"
									id="product"
									label="Produto"
									value={(product.productInfo && product.productInfo.nome) || ''}
									onChange={(event) => handleProductInfoChange(event, 'nome')}
									fullWidth
									required
									autoFocus
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									name="brand"
									id="brand"
									label="Marca"
									value={(product.productInfo && product.productInfo.marca) || ''}
									onChange={(event) => handleProductInfoChange(event, 'marca')}
									fullWidth
									required
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									name="ingredients"
									id="ingredients"
									label="Ingredientes"
									value={(product.productInfo && product.productInfo.ingredientes) || ''}
									onChange={(event) => handleProductInfoChange(event, 'ingredientes')}
									fullWidth
									multiline
									minRows={3}
									maxRows={6}
								/>
							</Grid>
							<Grid item xs={12}>
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
									endIcon={<RestoreIcon/>}>
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
export default EditProduct;