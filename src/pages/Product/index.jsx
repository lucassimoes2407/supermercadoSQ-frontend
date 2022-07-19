import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteProduct, getProductByCod } from "../../services/product";
import ImageIcon from '@mui/icons-material/Image';
import "./index.css"
import { ThemeProvider } from "styled-components";
import { Box, Button, Chip, Container, createTheme, CssBaseline, Modal, Typography } from "@mui/material";
import { useSnack } from '../../hooks/useSnack';
import { useNavigate } from 'react-router-dom'

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
      console.log(responseDelete);
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

  return (<>
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
    <div className="action-buttons__div">


      <Button
        variant="outlined"
        color="secondary"
        onClick={handleModal}>
        Deletar produto
      </Button>
      <Button
        variant="contained"
        color="primary"
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
  </>
  )
}

export default Product;