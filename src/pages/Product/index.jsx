import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCod } from "../../services/product";
import ImageIcon from '@mui/icons-material/Image';
import "./index.css"
import { getUserByUserId } from "../../services/users";
import { ThemeProvider } from "styled-components";
import { Box, Container, createTheme, CssBaseline, Grid, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard";

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
								<ImageIcon sx={{ fontSize: 120 }} />
								Imagem não encontrada
							</div>
						}
					</div>

					<Typography
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
						{product.restrictions.map((restriction) => {
							return (restriction.nome_restricao)
						})}
					<Typography
						variant="body1"
						color="primary"
					>
						Não existem Restrições associadas a este Produto
					</Typography>





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
						variant="body1"
						color="primary"
					>
						<b>{product.user.username || 'nome usuário'}</b>
					</Typography>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Product;