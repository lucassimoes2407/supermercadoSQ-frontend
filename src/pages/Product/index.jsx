import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCod } from "../../services/product";
import ImageIcon from '@mui/icons-material/Image';
import "./index.css"
import { getUserByUserId } from "../../services/users";
import { ThemeProvider } from "styled-components";
import { Box, Chip, Container, createTheme, CssBaseline, Grid, Typography } from "@mui/material";

const Product = () => {
	const theme = createTheme();

	const [product, setProduct] = useState({ productInfo: {}, user: {}, restrictions: [] });

	const params = useParams();

	useEffect(() => {
		try {
			(async () => {
				const getProduct = await getProductByCod(params.cod);
				const product = getProduct.data;
				console.log(product);
				console.log(product.productInfo.nome);
				setProduct(product)
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
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						textAlign: 'left'
					}}
				>

					<div className="product__div">
						{(product.img_produto && <img className="product__img" src={product.img_produto} alt="" />)
							|| <div className="image__div--not-found">
								<ImageIcon color="primary" sx={{ fontSize: 120 }} />
								<Typography
									variant="h1"
									fontSize={30}
									color="primary"
								>
									Imagem não encontrada
								</Typography>
							</div>
						}
					</div>

					<Typography
						mt={2}
						variant="h1"
						fontSize={30}
						color="primary"
					>
						<b>{(product.productInfo && product.productInfo.nome) || 'nome'}</b>
					</Typography>


					<Typography
						variant="subtitle1"
						color="primary"
					>
						<b>{(product.productInfo && product.productInfo.marca) || 'marca'}</b>
					</Typography>


					<Typography
						mt={2}
						variant="h2"
						fontSize={18}
						color="primary"
					>
						<b>Contém:</b>
					</Typography>



					<Box
						sx={{
							display: 'flex',
							gap: 1,
						}}
						variant="body1"
						color="primary"
					>
						{product.restrictions.map((restriction) => {
							return (
								<Chip
									key={restriction.nome_restricao}
									label={restriction.nome_restricao}
									color="primary"
								/>)
						})}
						{product.restrictions.length < 1
							&&
							<Typography variant="body1"
								fontSize={18}
								color="primary"
							>
								Não existem Restrições associadas a este Produto
							</Typography>}
					</Box>

					<Typography
						mt={2}
						variant="h2"
						fontSize={18}
						color="primary"
					>
						<b>Ingredientes:</b>
					</Typography>

					<Typography
						variant="body1"
						fontSize={20}
						color="primary"
					>
						{product.productInfo.ingredientes || 'ingredientes'}
					</Typography>

					<Typography
						mt={2}
						variant="h2"
						fontSize={18}
						color="primary"
					>
						<b>Autor:</b>
					</Typography>

					<Typography
						fontSize={18}
						variant="body1"
						color="primary"
					>
						{product.user.username || 'nome usuário'}
					</Typography>

				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Product;