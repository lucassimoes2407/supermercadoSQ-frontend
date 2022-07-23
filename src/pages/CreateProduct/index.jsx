import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, IconButton, TextField, Typography } from "@mui/material";
import "./index.css";
import UploadIcon from '@mui/icons-material/Upload';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddIcon from '@mui/icons-material/Add';
import { postProduct } from '../../services/product'
import { getUserLogged } from '../../services/users'
import { ThemeProvider } from 'styled-components';
import { useSnack } from '../../hooks/useSnack';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { getAllRestrictions } from "../../services/restriction";
import { postProductRestriction } from "../../services/produtoRestricao";
import FilterInputForEdit from "../../components/FilterInputForEdit";



const CreateProduct = () => {

  const navigate = useNavigate();
  const theme = createTheme();
  const { snack, handleSnackOpen, handleSnackState } = useSnack();
  const [restrictions, setRestrictions] = useState([]);
  const [restrictionsSelected, setRestrictionsSelected] = useState([]);

  const getAction = (cod_produto) => {
    if (!cod_produto) return
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
      var loggedUser = await getUserLogged();
      let codUser = loggedUser.data.user.cod_usuario; //FIXME[epic=login] adicionar cod_usuario logado
      
      const response = await postProduct(product, brand, ingredients, img, codUser);
      console.log(loggedUser, response);

      for (let restriction in restrictionsSelected) {
        let selected = restrictions.find(res => restrictionsSelected[restriction] === res.nome_restricao);
        await postProductRestriction(response.data.cod_produto, selected.cod_restricao);
      }

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

  const handleUpdateRestrictionsSelected = (selected) => {
    setRestrictionsSelected(selected)
  }

  const getRestrictions = async () => {
    const { data } = await getAllRestrictions();
    setRestrictions(data);
  }
  useEffect(() => {
    console.log(getRestrictions())
  }, [])

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
              <Grid item xs={12} >
                <FilterInputForEdit
                  items={restrictions.map(restriction => restriction.nome_restricao) || []}
                  title={'Restrições'}
                  updateSelecteds={handleUpdateRestrictionsSelected}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<SaveAsIcon/>}
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