import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, IconButton, TextField, Typography } from "@mui/material";
import "./index.css";
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import { postProduct } from '../../services/product'
import { ThemeProvider } from 'styled-components';
import { useSnack } from '../../hooks/useSnack';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Close } from '@mui/icons-material';



const CreateProduct = () => {

  const navigate = useNavigate();
  const theme = createTheme();
  const { snack, handleSnackOpen, handleSnackState } = useSnack();

  const getAction = (cod_produto) => {
    if(!cod_produto) return
    return <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => { navigate(`/product/${cod_produto}`) }}
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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      let product = data.get('product');
      let brand = data.get('brand');
      let ingredients = data.get('ingredients');
      let img = data.get('img');
      let codUser = 5; //FIXME[epic=login] adicionar cod_usuario logado

      const response = await postProduct(product, brand, ingredients, img, codUser);
      console.log(response);

      if (response.status === 200) {
        handleSnackState(
          { 
            ...snack,
            action: getAction(response.data.cod_produto),
            open: true,
            message: "Produto cadastrado com sucesso!",
          }
        )
      }
      navigate('/');

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
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="ingredients"
                  id="ingredients"
                  label="Ingredientes"
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={6}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="flex-start">
                <Button component="label">
                  <UploadIcon /> Enviar Foto
                  <input name='img' id='img' hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
export default CreateProduct;