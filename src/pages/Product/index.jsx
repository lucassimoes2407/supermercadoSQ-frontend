import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteProduct, getProductByCod } from "../../services/product";
import { getUserLogged } from "../../services/users";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./index.css"
import { ThemeProvider } from "styled-components";
import { Box, Button, Chip, Container, createTheme, CssBaseline, Modal, Typography } from "@mui/material";
import { useSnack } from '../../hooks/useSnack';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from "../../services/auth";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Product = () => {
  const theme = createTheme();

  const [product, setProduct] = useState({ productInfo: {}, user: {}, restrictions: [] });
  const [modalDelete, setModalDelete] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { snack, handleSnackState } = useSnack();

  useEffect(() => {
    try {
      (async () => {
        const getProduct = await getProductByCod(params.cod);
        if (!getProduct || !getProduct.data || !getProduct.data.productInfo) navigate('/notfound');
        const product = getProduct.data;
        setProduct(product)
      })();
    } catch (e) {
      console.log(e);
    }
  }, [navigate, params.cod]);

  const handleModal = () => {
    setModalDelete(previousState => !previousState);
  }

  const handleDelete = async () => {
    try {
      handleModal();
      const responseDelete = await deleteProduct(params.cod);
      if (responseDelete.status === 200) {
        handleSnackState(
          {
            ...snack,
            open: true,
            message: responseDelete.data
          }
        )
      }
      navigate('/');
    } catch (e) {
      handleSnackState(
        {
          ...snack,
          open: true,
          message: 'Não foi possível deletar'
        }
      )
    }
  }
 
  
  const [botoesBoolean, setBotoesBoolean] = useState(false)

  const validateUser = (async () => {
    if ( !isAuthenticated() ) return false;
      var user = (await getUserLogged()).data.user;
      if(user.cod_usuario !== product.user.cod_usuario && user.acesso !== 3)
        return false;

    setBotoesBoolean(true);    
    return true;
  })

  const botoes = () => {
      return (
        <div className="action-buttons__div">

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleModal}
          endIcon={<DeleteIcon/>}
          >
          Deletar produto
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<EditIcon/>}
          onClick={() => navigate(`/product/${params.cod}/edit`)}>
          Editar produto
        </Button>
        <Modal
          open={modalDelete}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2 id="parent-modal-title">Deseja deletar o produto?</h2>
            <p id="parent-modal-description">
              Essa ação não pode ser desfeita
            </p>
            <div className="modal__buttons">
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleModal}>
                  Cancelar
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}>
                  Deletar
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
        </div>
    )
  }

  useEffect(() => {
    validateUser();
  }, [product])
  
  useEffect(() => {
    console.log(botoesBoolean);
    
  }, [botoesBoolean])

return (<>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 6,
            mb: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left'
          }}
        >
          <Typography
            mt={10}
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
            mt={1}
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
            }}
            variant="body1"
            color="primary"
          >
            {product.restrictions.map((restriction) => {
              return (
                <Chip
                  key={restriction.nome_restricao + `productPage`}
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
    {botoesBoolean && botoes()}
  </>
  )
}

export default Product;