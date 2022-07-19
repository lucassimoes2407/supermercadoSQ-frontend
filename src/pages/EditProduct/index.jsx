import react, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import "./index.css";
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import { getProductByCod, postProduct, putProduct } from '../../services/product'
import { ThemeProvider } from 'styled-components';
import CopyrightDevHub from '../../components/CopyrightDevHub';
import { useSnack } from '../../hooks/useSnack';
import { useNavigate, useParams } from 'react-router-dom';


const EditProduct = () => {
    const [product, setProduct] = useState({ productInfo: {}, user: {}, restrictions: [] });

    const params = useParams();
    const navigate = useNavigate();
    const theme = createTheme();
    const { snack, handleSnackState } = useSnack();

    useEffect(() => {
        try {
            (async () => {
                const getProduct = await getProductByCod(params.cod);
                if (!getProduct || !getProduct.data) navigate('/notfound');
                const product = getProduct.data;
                setProduct(product)
            })();
        } catch (e) {
            console.log(e);
        }
    }, [navigate, params.cod]);

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

            if (response.status === 200) {
                handleSnackState(
                    {
                        ...snack,
                        open: true,
                        message: response.data
                    }
                )
            }

            if(!product.productInfo.cod_produto){
                return;
            }
            navigate(`/product/${product.productInfo.cod_produto}`);

        } catch (e) {
            console.log(e);
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
            setProduct(product)
        })()
    }

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
                        <AddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Novo Produto</Typography>

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
                                    value={(product.productInfo && product.productInfo.nome) || 'nome'}
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
                                    value={(product.productInfo && product.productInfo.marca) || 'marca'}
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
                                    value={(product.productInfo && product.productInfo.ingredientes) || 'ingredientes'}
                                    onChange={(event) => handleProductInfoChange(event, 'ingredientes')}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={6}
                                />
                            </Grid>
                            <Grid item xs={12} container justifyContent="flex-start">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleClear}>
                                    Reiniciar
                                </Button>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Salvar alterações
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default EditProduct;